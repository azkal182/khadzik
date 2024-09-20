import axios from "@/lib/axios";
import { useMutation } from "react-query";

const useCreateTransaction = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: async (body) => {
      const transactionResponse = await axios.post("/api/transactions", body);
      transactionResponse;
    },
    onSuccess
  });
};

export default useCreateTransaction;
