import axios from "@/lib/axios";
import { useMutation } from "react-query";

const useCreateUser = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: async (body) => {
      const userResponse = await axios.post("/api/users", body);
      userResponse;
    },
    onSuccess
  });
};

export default useCreateUser;
