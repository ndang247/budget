import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type RepsonseType = InferResponseType<
  (typeof client.api.accounts)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.accounts)[":id"]["$patch"]
>["json"];

export const useEditAccount = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation<RepsonseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts[":id"]["$patch"]({
        param: { id },
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Account updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["account", { id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
      // TODO: Invalidate summary and trasactions
    },
    onError: () => {
      toast.error("Failed to edit account");
    },
  });
};
