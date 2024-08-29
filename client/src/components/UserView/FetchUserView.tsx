import {FC} from "react";
import {useQuery} from "@tanstack/react-query";
import {FetchUser} from "../../api/User.ts";
import {queryClient} from "../../api/queryClient.ts";
import {Loader} from "../Loader";
import {UserView} from "./UserView.tsx";

export interface FetchUserViewProps {
    userId: string;
}

export const FetchUserView: FC<FetchUserViewProps> = ({userId}) => {
const userQuery = useQuery({
    queryFn: ()  => FetchUser(userId),
    queryKey: ["users", userId],

},
    queryClient
);
switch(userQuery.status) {
    case "pending":
        return <Loader />
    case "success":
        return <UserView user={userQuery.data}/>;
    case "error":
        return <div>
            <span>Error ;( </span>
            <button onClick={() => userQuery.refetch()}>Try again</button>
        </div>
}
}