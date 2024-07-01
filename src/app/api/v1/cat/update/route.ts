
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            userID,
            catID,
            updateData
        } = await request.json() as {
            userID: string,
            catID: string,
            updateData: any
        }
        const catRef = doc(db, "user", userID, "cat", catID);
        await updateDoc(catRef, updateData);
        return new Response(
            JSON.stringify({
                success: true,
                message: "업데이트 성공",
                data: {}
            })
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "업데이트 실패",
                data: {}
            })
        )
    }
}