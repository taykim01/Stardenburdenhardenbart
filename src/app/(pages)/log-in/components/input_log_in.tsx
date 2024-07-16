"use client"

import Input from "@/lib/input";
import { useState } from "react";
import Components from ".";
import Button from "@/lib/button";
import EmailLogIn from "@/repository/v1.0.0/user/email_log_in";
import { useSetRecoilState } from "recoil";
import { loadingState } from "@/recoil/loading";
import ReadCat from "@/repository/v1.0.0/cat/read_cat";
import { useRaiseErrorPopup } from "@/hooks/use_raise_error_popup";
import { useLoadingRouter } from "@/hooks/use_loading_router";

export default function InputLogIn() {
    const email_log_in = new EmailLogIn()
    const read_cat = new ReadCat()



    const router = useLoadingRouter()
    const setLoading = useSetRecoilState(loadingState)
    const [logInData, setLogInData] = useState({
        email: "",
        password: ""
    })
    const raiseErrorPopup = useRaiseErrorPopup()


    const setEmail = (email: string) => setLogInData({ ...logInData, email })
    const setPassword = (password: string) => setLogInData({ ...logInData, password })


    const logIn = async () => {
        setLoading(true)
        const response = await email_log_in.logIn(logInData.email, logInData.password)
        if (!response.success) {
            raiseErrorPopup(response.message)
            setLoading(false)
            return
        }
        const checkCatRes = await read_cat.read()
        if (checkCatRes.data === "no_cat") router("/adopt-cat")
        else router("/my-cat")
        setLoading(false)
    }

    return (
        <>
            <div className="flex flex-col gap-5 w-full items-center">
                <div className="flex flex-col items-center gap-3 w-full">
                    <Input.Text
                        onChange={setEmail}
                        type="email"
                        placeholder="이메일을 입력해주세요."
                        onEnter={logIn}
                    />
                    <Input.Text
                        onChange={setPassword}
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        onEnter={logIn}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Components.SignUpButton />
                    <div className="font-fs-r text-gray-500 text-16">|</div>
                    <Components.GoogleSignUpButton />
                </div>
            </div>
            <Button.Default onClick={logIn}>로그인하기</Button.Default>
        </>
    )
}