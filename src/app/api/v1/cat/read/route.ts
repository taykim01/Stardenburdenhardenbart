import { db } from "@/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore"

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            userID
        } = await request.json() as {
            userID: string
        }
        const cats: CatModel[] = []
        const colRef = collection(db, "users", userID, "cat")
        const querySnapshot = await getDocs(colRef)
        querySnapshot.forEach((doc) => {
            cats.push(
                {
                    ...doc.data(),
                    id: doc.id
                } as CatModel
            )
        })
        const catData = cats[0]
        return new Response(
            JSON.stringify({
                success: true,
                message: "고양이 생성 성공",
                data: {catData, cats}
            })
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "고양이 생성 실패",
                data: String(error)
            })
        )
    }
}