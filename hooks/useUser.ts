"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/auth";
import { User } from "@/lib/types";
import { useRouter } from "next/navigation";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const session = auth.getSession();
    if (!session) {
      router.push("/login");
    } else {
      setUser(session);
    }
    setLoading(false);
  }, [router]);

  return { user, loading };
}
