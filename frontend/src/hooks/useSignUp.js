import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { signup } from '../lib/api.js';

const useSignUp = () => {
    const queryClient=useQueryClient();
    const {mutate ,isPending ,error}=useMutation({
      mutationFn :signup,
      onSuccess:()=>{
        //  queryClient.setQueryData(["authUser"], { user: data.user });
        queryClient.invalidateQueries({queryKey:["authUser"]});
      }
    });
    return {isPending,error,mutate};
}

export default useSignUp;