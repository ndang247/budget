import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type RepsonseType = InferResponseType<
  (typeof client.api.accounts)[":id"]["$delete"]
>;

export const useDeleteAccount = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation<RepsonseType, Error>({
    mutationFn: async () => {
      const response = await client.api.accounts[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Account deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["account", { id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
      // TODO: Invalidate summary and trasactions
    },
    onError: () => {
      toast.error("Failed to delete account");
    },
  });
};
