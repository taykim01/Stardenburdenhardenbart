"use client"

import { useLoadingRouter } from "@/hooks/use_loading_router"
import { loadingState } from "@/recoil/loading"
import CheckSession from "@/repository/v1.0.0/user/check_session"
import { useEffect } from "react"
import { useSetRecoilState } from "recoil"


export default function CheckSessionTag() {
    const check_session = new CheckSession()

    const router = useLoadingRouter()
    const setLoading = useSetRecoilState(loadingState)
    const checkSession = async () => {
        setLoading(true)
        const response = await check_session.check()
        if (!response.success) router("/log-in")
        setLoading(false)
    }
    useEffect(() => {
        checkSession()
    }, [])
    return <></>
}