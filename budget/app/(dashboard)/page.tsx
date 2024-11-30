"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="pt-1">
        <Button onClick={() => router.push("/accounts")}>Go to accounts</Button>
      </div>
      <div className="pt-1">
        <Button onClick={() => router.push("/categories")}>
          Go to categories
        </Button>
      </div>
    </>
  );
}
