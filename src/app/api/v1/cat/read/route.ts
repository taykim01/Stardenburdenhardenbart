
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            userID,
            catID,
        } = await request.json() as {
            userID: string,
            catID: string,
        }
        const catRef = doc(db, "user", userID, "cat", catID);
        const catSnap = await getDoc(catRef);
        const cat = {
            ...catSnap.data(),
            id: catSnap.id,
        }
        return new Response(
            JSON.stringify({
                success: true,
                message: "고양이 상태 가져오기 성공",
                data: cat
            })
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "고양이 상태 가져오기 실패",
                data: {}
            })
        )
    }
}