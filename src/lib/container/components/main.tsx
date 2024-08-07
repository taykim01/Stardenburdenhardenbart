import { ReactNode } from "react"
import Header from "./header"

export default function Main(props:{
    children: ReactNode,
    headerTitle: string,
    bgClass?: string
    badge?: boolean,
    back?: boolean
}){
    const backgroundClass = props.bgClass || "bg-gradient-1";
    return (
        <div className={`flex flex-col h-full w-screen px-5 ${backgroundClass} pb-5`} style={{ maxWidth: 393}}>
            <Header badge={props.badge} back={props.back}>{props.headerTitle}</Header>
            {props.children}
        </div>
    )
}