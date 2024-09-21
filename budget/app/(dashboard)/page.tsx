"use client";
import { Button } from "@/components/ui/button";

import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

export default function Home() {
  const { onOpen } = useNewAccount();
  const { data: accounts, isLoading } = useGetAccounts();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Button onClick={onOpen}>Add an account</Button>
    </div>
  );
}
