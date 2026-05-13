"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useUser } from "@/hooks/useUser";
import { useSupabaseData } from "@/hooks/useSupabase";
import { User, UserRole } from "@/lib/types";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import { Trash2, Shield, User as UserIcon, MoreHorizontal } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import Spinner from "@/components/ui/Spinner";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const { user } = useUser();
  const router = useRouter();
  const { data: allUsers, loading, refetch } = useSupabaseData<User>('sb_users');
  
  useEffect(() => {
    if (user && user.role !== 'Admin') {
      toast.error("Access Denied: Admin only");
      setTimeout(() => router.push("/dashboard"), 3000);
    }
  }, [user, router]);

  if (!user || user.role !== 'Admin') {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background gap-4">
        <Shield size={48} className="text-destructive animate-bounce" />
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground">Redirecting to dashboard in 3 seconds...</p>
      </div>
    );
  }

  const handleUpdateRole = async (id: string, newRole: UserRole) => {
    try {
      const { error } = await supabase.from('sb_users').update({ role: newRole }).eq('id', id);
      if (error) throw error;
      toast.success(`Role updated to ${newRole}`);
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Delete this user? This action cannot be undone.")) return;
    try {
      const { error } = await supabase.from('sb_users').delete().eq('id', id);
      if (error) throw error;
      toast.success("User deleted");
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const columns = [
    { 
      header: "User", 
      accessorKey: "name",
      cell: (row: User) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-primary font-bold">
            {row.name[0]}
          </div>
          <div>
            <p className="font-bold">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      )
    },
    { header: "Business", accessorKey: "business_name" },
    { header: "Category", accessorKey: "business_category" },
    { 
      header: "Role", 
      accessorKey: "role",
      cell: (row: User) => (
        <Badge variant={row.role === 'Admin' ? 'info' : 'default'}>
          {row.role}
        </Badge>
      )
    },
    { header: "Joined", accessorKey: "created_at", cell: (row: User) => new Date(row.created_at).toLocaleDateString() },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold">User Management</h1>
          <p className="text-muted-foreground mt-1">Control access and roles for all platform users.</p>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={allUsers}
            searchKey="name"
            actions={(row) => (
              <div className="flex items-center justify-end gap-2">
                <select
                  className="bg-secondary/50 border-none rounded-lg text-xs font-bold py-1 px-2 focus:ring-1 focus:ring-primary/20 outline-none"
                  value={row.role}
                  onChange={(e) => handleUpdateRole(row.id, e.target.value as UserRole)}
                >
                  <option value="Admin">Admin</option>
                  <option value="Viewer">Viewer</option>
                </select>
                <button
                  onClick={() => handleDeleteUser(row.id)}
                  className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                  title="Delete User"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
