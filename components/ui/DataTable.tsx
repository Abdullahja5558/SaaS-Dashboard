"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, MoreVertical, Search, Filter } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchKey?: keyof T;
  onRowClick?: (row: T) => void;
  actions?: (row: T) => React.ReactNode;
}

export default function DataTable<T extends { id: string | number }>({ 
  columns, 
  data, 
  searchKey,
  onRowClick,
  actions
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    let result = [...data];
    if (searchTerm && searchKey) {
      result = result.filter(item => 
        String(item[searchKey]).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = String(a[sortConfig.key as keyof T]);
        const bValue = String(b[sortConfig.key as keyof T]);
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [data, searchTerm, searchKey, sortConfig]);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="space-y-4">
      {searchKey && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder={`Search ${String(searchKey)}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-secondary/50 border-none rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 outline-none text-sm"
          />
        </div>
      )}

      <div className="rounded-2xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/30">
                {columns.map((col) => (
                  <th
                    key={String(col.accessorKey)}
                    className={cn(
                      "p-4 text-sm font-semibold text-muted-foreground",
                      col.sortable && "cursor-pointer hover:text-foreground select-none"
                    )}
                    onClick={() => col.sortable && handleSort(String(col.accessorKey))}
                  >
                    <div className="flex items-center gap-1">
                      {col.header}
                      {col.sortable && sortConfig?.key === col.accessorKey && (
                        sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      )}
                    </div>
                  </th>
                ))}
                {actions && <th className="p-4 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredData.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "border-t hover:bg-secondary/20 transition-colors",
                      onRowClick && "cursor-pointer"
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {columns.map((col) => (
                      <td key={String(col.accessorKey)} className="p-4 text-sm font-medium">
                        {col.cell ? col.cell(row) : String(row[col.accessorKey as keyof T])}
                      </td>
                    ))}
                    {actions && (
                      <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                        {actions(row)}
                      </td>
                    )}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
