"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export function useSupabaseData<T>(table: string, userId?: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      // If a userId is expected but not yet available, don't fetch
      if (userId === undefined) {
        setData([]);
        setLoading(false);
        return;
      }

      let query = supabase.from(table).select("*");
      
      if (userId) {
        query = query.eq('user_id', userId);
      }
      
      const { data: result, error: supabaseError } = await query;
      
      if (supabaseError) throw supabaseError;
      setData(result || []);
    } catch (err: any) {
      setError(err.message);
      toast.error(`Error fetching ${table}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [table, userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
