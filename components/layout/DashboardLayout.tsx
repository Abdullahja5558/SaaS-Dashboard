"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useUser } from "@/hooks/useUser";
import Spinner from "@/components/ui/Spinner";
import PageWrapper from "./PageWrapper";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background overflow-x-hidden selection:bg-primary/30">
      <Sidebar />
      <div className="flex-1 flex flex-col transition-all duration-300 md:pl-[280px] will-change-[padding]">
        <Header />
        <PageWrapper className="flex-1 p-4 md:p-6 lg:p-10 w-full max-w-[1600px] mx-auto overflow-x-hidden will-change-transform">
          {children}
        </PageWrapper>
      </div>
    </div>
  );
}
