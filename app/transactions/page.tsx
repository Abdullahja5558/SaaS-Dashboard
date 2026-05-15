"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useUser } from "@/hooks/useUser";
import { useSupabaseData } from "@/hooks/useSupabase";
import { Transaction } from "@/lib/types";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import { Plus, Edit2, Trash2, Download, Search } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import Spinner from "@/components/ui/Spinner";
import UpgradeModal from "@/components/ui/UpgradeModal";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function TransactionsPage() {
  const { user } = useUser();
  const { data: transactions, loading, refetch } = useSupabaseData<Transaction>('sb_transactions', user?.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const [formData, setFormData] = useState({
    customer_name: "",
    amount: "",
    status: "Paid" as Transaction['status'],
    category: "",
    date: new Date().toISOString().split('T')[0]
  });
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  if (!user) return null;

  const exportToPDF = () => {
    const doc = new jsPDF();
    
   
    doc.setFontSize(22);
    doc.setTextColor(99, 102, 241); 
    doc.text("CORELYTICS", 14, 22);
    
 
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("TRANSACTION LEDGER REPORT", 14, 30);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 36);
    doc.text(`Business: ${user.business_name}`, 14, 42);
    
   
    const tableData = transactions.map(tx => [
      tx.customer_name,
      `$${tx.amount}`,
      tx.status,
      tx.category,
      tx.date
    ]);

    autoTable(doc, {
      startY: 50,
      head: [['Customer', 'Amount', 'Status', 'Category', 'Date']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [99, 102, 241], textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      margin: { top: 50 },
    });

    doc.save(`Corelytics_Report_${new Date().getTime()}.pdf`);
    toast.success("PDF Report Generated Successfully");
  };

  const handleOpenModal = (tx?: Transaction) => {
    // Check limit for Free plan (20 transactions)
    if (!tx && (user.plan === 'Free' || !user.plan) && transactions.length >= 20) {
      setIsUpgradeModalOpen(true);
      return;
    }
    if (tx) {
      setEditingTx(tx);
      setFormData({
        customer_name: tx.customer_name,
        amount: String(tx.amount),
        status: tx.status,
        category: tx.category,
        date: tx.date
      });
    } else {
      setEditingTx(null);
      setFormData({
        customer_name: "",
        amount: "",
        status: "Paid",
        category: "",
        date: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        amount: Number(formData.amount),
        user_id: user.id
      };

      if (editingTx) {
        const { error } = await supabase.from('sb_transactions').update(payload).eq('id', editingTx.id);
        if (error) throw error;
        toast.success("Transaction updated");
      } else {
        const { error } = await supabase.from('sb_transactions').insert([payload]);
        if (error) throw error;
        toast.success("Transaction added");
      }
      setIsModalOpen(false);
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    try {
      const { error } = await supabase.from('sb_transactions').delete().eq('id', id);
      if (error) throw error;
      toast.success("Transaction deleted");
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const columns = [
    { header: "Customer", accessorKey: "customer_name", sortable: true },
    { 
      header: "Amount", 
      accessorKey: "amount", 
      sortable: true,
      cell: (row: Transaction) => <span className="font-bold">${row.amount}</span>
    },
    { 
      header: "Status", 
      accessorKey: "status", 
      sortable: true,
      cell: (row: Transaction) => (
        <Badge variant={row.status === 'Paid' ? 'success' : row.status === 'Pending' ? 'warning' : 'error'}>
          {row.status}
        </Badge>
      )
    },
    { header: "Category", accessorKey: "category", sortable: true },
    { header: "Date", accessorKey: "date", sortable: true },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Transactions</h1>
            <p className="text-muted-foreground mt-1">Manage all your customer payments and history.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportToPDF}
              className="bg-secondary text-foreground rounded-xl px-4 py-2 font-bold flex items-center gap-2 hover:bg-secondary/80 transition-all border border-border"
            >
              <Download size={20} />
              Export PDF
            </button>
            <button
              onClick={() => handleOpenModal()}
              className="bg-primary text-primary-foreground rounded-xl px-4 py-2 font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              <Plus size={20} />
              Add Transaction
            </button>
          </div>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={transactions}
            searchKey="customer_name"
            actions={(row) => (
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenModal(row)}
                  className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          />
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingTx ? "Edit Transaction" : "New Transaction"}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Customer Name</label>
              <input
                type="text"
                required
                className="w-full bg-secondary/50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/50 outline-none"
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Amount ($)</label>
                <input
                  type="number"
                  required
                  className="w-full bg-secondary/50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/50 outline-none"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Status</label>
                <select
                  className="w-full bg-secondary/50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/50 outline-none"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Category</label>
              <input
                type="text"
                className="w-full bg-secondary/50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/50 outline-none"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Date</label>
              <input
                type="date"
                required
                className="w-full bg-secondary/50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/50 outline-none"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold mt-4 hover:bg-primary/90 transition-all"
            >
              {editingTx ? "Update Transaction" : "Create Transaction"}
            </button>
          </form>
        </Modal>

        <UpgradeModal
          isOpen={isUpgradeModalOpen}
          onClose={() => setIsUpgradeModalOpen(false)}
          message="You've reached the limit of 20 transactions on the Starter plan."
        />
      </div>
    </DashboardLayout>
  );
}
