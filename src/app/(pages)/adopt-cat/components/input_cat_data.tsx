"use client"

import Button from "@/lib/button"
import CatComponent from "@/lib/cat_component"
import Input from "@/lib/input"
import Popup from "@/lib/popup"
import AdoptCat from "@/repository/v1.0.0/cat/adopt_cat"
import { CatSex, CatType } from "@/repository/v1.0.0/cat/cat"
import { sendGAEvent } from "@next/third-parties/google"
import { useRouter } from "next/navigation"
import { useState } from "react"

type CatData = {
    name: string,
    color: string,
    sex: string,
}

export default function InputCatData() {
    const adopt_cat = new AdoptCat()


    const router = useRouter()
    const [personalityPopup, setPersonalityPopup] = useState<boolean>(false)
    const [catData, setCatData] = useState<CatData>({
        name: "",
        color: "",
        sex: "",
    })
    const [errorPopup, setErrorPopup] = useState({
        open: false,
        title: "",
        children: ""
    })


    const setName = (name: CatData["name"]) => setCatData({ ...catData, name })
    const setColor = (color: CatData["color"]) => {
        if (color === "흰냥이") setCatData(prevCatData => ({
            ...prevCatData,
            color: prevCatData.color === color ? "" : color
        }))
        else setErrorPopup({
            open: true,
            title: "무료 버전은 흰냥이만 입양 가능해요.",
            children: "빠른 시일 내에 다른 냥이를 입양할 수 있게 준비할게요!"
        })
    }
    const setSex = (sex: CatData["sex"]) => setCatData(prevCatData => ({
        ...prevCatData,
        sex: prevCatData.sex === sex ? "" : sex
    }))


    const adoptCat = async () => {
        const verifyRes = await adopt_cat.verifyInput(
            catData.name,
            catData.color as CatType,
            catData.sex as CatSex
        )
        if (!verifyRes.success) {
            setErrorPopup({
                open: true,
                title: "오류가 발생했어요",
                children: verifyRes.message
            })
            return
        }


        sendGAEvent({ event: 'adopt_cat', value: 'adopt_cat' })
        const verification = await adopt_cat.verifyInput(
            catData.name,
            catData.color as CatType,
            catData.sex as CatSex
        )
        if (!verification.success) {
            setErrorPopup({
                open: true,
                title: "오류가 발생했어요.",
                children: verification.message
            })
            return
        }
        const response = await adopt_cat.adopt(
            catData.name,
            catData.color as CatType,
            catData.sex as CatSex
        )
        if (!response.success) {
            setErrorPopup({
                open: true,
                title: "오류가 발생했어요.",
                children: response.message
            })
            return
        }
        setErrorPopup({
            open: true,
            title: `${catData.name} 입양에 성공했어요.`,
            children: `아기 ${catData.name}(이)가 기다리고 있어요!`
        })
    }

    return (
        <>
            <div className="flex flex-col items-center justify-between flex-grow w-full">
                <div className="flex flex-col gap-5 w-full items-center">
                    {
                        catData.color
                            ? <div style={{ maxWidth: 150, maxHeight: 150 }}>
                                <CatComponent color={catData.color as CatType} />
                            </div>
                            : <div style={{ width: 150, height: 150 }} />
                    }
                    <div className="flex flex-col items-center gap-4 w-full">
                        <Input.Text
                            title="고양이 이름"
                            onChange={setName}
                            placeholder="불러주고픈 이름이 있나요?"
                            onEnter={adoptCat}
                        />
                        <Input.MultiSelect
                            title="성격"
                            onSelect={setColor}
                            guide="고양이별 성격 알아보기"
                            guideClick={() => setPersonalityPopup(true)}
                            items={["흰냥이", "치즈냥이", "깜냥이"]}
                            unSelectable={["치즈냥이", "깜냥이"]}
                        />
                        <Input.MultiSelect
                            title="성별"
                            onSelect={setSex}
                            items={["수컷", "암컷"]}
                        />
                    </div>
                </div>
                <Button.Default onClick={adoptCat}>{`${catData.name || "_____"} 입양하기!`}</Button.Default>
            </div>
            <Popup.Default
                title="고양이별 성격 알아보기"
                open={personalityPopup}
                onClose={() => setPersonalityPopup(false)}>
                <div className="flex flex-col gap-5">
                    <CatListItem cat="흰냥이" detail="수줍음, 겁많음, 섬세함, 느긋함"></CatListItem>
                    <CatListItem cat="치즈냥이" detail="활발함,응석받이, 소심"></CatListItem>
                    <CatListItem cat="깜냥이" detail="똑똑함, 얌전함"></CatListItem>
                </div>
            </Popup.Default>
            <Popup.Default
                open={errorPopup.open}
                onClose={() => {
                    setErrorPopup({ ...errorPopup, open: false });
                    errorPopup.title === `${catData.name} 입양에 성공했어요.` && router.push("/my-cat");
                }}
                title={errorPopup.title}
            >
                {errorPopup.children}
            </Popup.Default>
        </>
    )
}

function CatListItem(props: {
    cat: string,
    detail: string
}) {
    return (
        <div className="flex items-start justify-between gap-[10px] w-full">
            <div className="bg-pink-0.15 text-pink-200  font-fs-m text-18">{props.cat}</div>
            <div className="text-black-1  font-fs-m text-18">{props.detail}</div>
        </div>
    )
}