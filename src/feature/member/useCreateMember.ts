import axios from "@/lib/axios";
import { useMutation } from "react-query";

const useCreateMember = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: async (body) => {
      const productResponse = await axios.post("/api/members", body);
      productResponse;
    },
    onSuccess
  });
};

export default useCreateMember;
