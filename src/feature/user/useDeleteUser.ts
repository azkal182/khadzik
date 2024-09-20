import axios from "@/lib/axios";
import { useMutation } from "react-query";

const useDeleteUser = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: async (id) => {
      const userResponse = await axios.delete("/api/users/" + id);
      userResponse;
    },
    onSuccess
  });
};

export default useDeleteUser;
