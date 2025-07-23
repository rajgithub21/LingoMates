import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api.js";


const useAuthUser = () => {
     const authUser = useQuery({
       queryKey: ["authUser"],
       queryFn: getAuthUser,
       retry: false, //not trying 3 more time as this is the auth check;
     });
     return {isLoading : authUser.isLoading , authUser:authUser.data?.user};
};

export default useAuthUser;