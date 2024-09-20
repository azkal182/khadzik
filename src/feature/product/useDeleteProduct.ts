import axios from "@/lib/axios";
import { useMutation } from "react-query";

const useDeleteProduct = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: async (id) => {
      const productResponse = await axios.delete("/api/products/" + id);
      productResponse;
    },
    onSuccess
  });
};

export default useDeleteProduct;
