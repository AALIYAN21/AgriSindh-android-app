import { userProfile } from '@/services/userProfile'
import { useQuery } from '@tanstack/react-query'

export const useProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: userProfile,
        staleTime: Infinity,
    })
}
