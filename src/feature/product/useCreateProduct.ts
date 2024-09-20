import axios from "@/lib/axios";
import { useMutation } from "react-query";

const useCreateProduct = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: async (body) => {
      const productResponse = await axios.post("/api/products", body);
      productResponse;
    },
    onSuccess
  });
};

export default useCreateProduct;
