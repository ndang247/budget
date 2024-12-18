import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type RepsonseType = InferResponseType<
  (typeof client.api.categories)[":id"]["$delete"]
>;

export const useDeleteCategory = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation<RepsonseType, Error>({
    mutationFn: async () => {
      const response = await client.api.categories[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["category", { id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      // TODO: Invalidate summary and trasactions
    },
    onError: () => {
      toast.error("Failed to delete category");
    },
  });
};
