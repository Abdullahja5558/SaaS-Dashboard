"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useUser } from "@/hooks/useUser";
import { useSupabaseData } from "@/hooks/useSupabase";
import { Notification } from "@/lib/types";
import { Bell, CheckCircle2, Info, AlertTriangle, XCircle, Trash2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import Spinner from "@/components/ui/Spinner";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  const { user } = useUser();
  const { data: notifications, loading, refetch } = useSupabaseData<Notification>('sb_notifications', user?.id);

  if (!user) return null;

  const handleMarkRead = async (id: string) => {
    try {
      const { error } = await supabase.from('sb_notifications').update({ is_read: true }).eq('id', id);
      if (error) throw error;
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const { error } = await supabase.from('sb_notifications').update({ is_read: true }).eq('user_id', user.id);
      if (error) throw error;
      toast.success("All notifications marked as read");
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('sb_notifications').delete().eq('id', id);
      if (error) throw error;
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="text-emerald-500" size={20} />;
      case 'warning': return <AlertTriangle className="text-amber-500" size={20} />;
      case 'error': return <XCircle className="text-red-500" size={20} />;
      default: return <Info className="text-blue-500" size={20} />;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Notifications</h1>
            <p className="text-muted-foreground mt-1">Stay updated with your business alerts and activity.</p>
          </div>
          <button
            onClick={handleMarkAllRead}
            className="text-primary text-sm font-bold flex items-center gap-2 hover:underline"
          >
            <Check size={18} />
            Mark all read
          </button>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {notifications.length === 0 ? (
                <div className="text-center py-20 bg-secondary/20 rounded-3xl border border-dashed">
                  <Bell className="mx-auto text-muted-foreground mb-4" size={48} />
                  <p className="text-muted-foreground font-medium">No notifications yet.</p>
                </div>
              ) : (
                notifications.map((notif, i) => (
                  <motion.div
                    key={notif.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={cn(
                      "glass-card rounded-2xl p-4 border flex items-start gap-4 transition-all",
                      !notif.is_read ? "border-primary/30 bg-primary/5" : "border-white/5"
                    )}
                  >
                    <div className="mt-1">{getIcon(notif.type)}</div>
                    <div className="flex-1">
                      <p className={cn("text-sm font-medium", !notif.is_read ? "text-foreground" : "text-muted-foreground")}>
                        {notif.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(notif.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notif.is_read && (
                        <button
                          onClick={() => handleMarkRead(notif.id)}
                          className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                          title="Mark as read"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notif.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
