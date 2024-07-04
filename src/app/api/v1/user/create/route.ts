import { db } from "@/firebase";
import { collection, doc, setDoc } from "firebase/firestore"

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            userData
        } = await request.json() as {
            userData: UserModel
        }
        const userID = userData.id
        const userRef = doc(collection(db, "user"), userID)
        await setDoc(
            userRef, userData
        )
        return new Response(
            JSON.stringify({
                success: true,
                message: "유저 생성 성공",
                data: {}
            })
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "유저 생성 실패",
                data: String(error)
            })
        )
    }
}