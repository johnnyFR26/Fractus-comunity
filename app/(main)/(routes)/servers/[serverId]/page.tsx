"use client"

import { useParams } from "next/navigation";

const ServerPage = () => {
    const params = useParams();

    return ( 
        <div>serverPage {params.serverId}</div>
     );
}
 
export default ServerPage;