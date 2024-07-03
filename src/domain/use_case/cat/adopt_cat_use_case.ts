import MyResponse from "../MyResponse"

export default class AdoptCatUseCase {

    async adopt( 
        catName : string,
        color : string,
        sex : string
    ): Promise<MyResponse> {
        try {
            const userID = sessionStorage.getItem('uid')
            if(!userID) return new MyResponse(false, "세션이 없습니다.", {})
                
            const catData: CatModel = {
                userID : userID,
                catName : catName,
                color : color,
                sex : sex,
                catStatus: {
                    hunger : 50,
                    health : 50,
                    affection : 50,
                },
                catChapter : "firstMeeting",
                catChat : [] as CatChat[],
                neutered : false,
            
            }
           

            const res = await fetch(`http://localhost:3000/api/v1/cat/create`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body : JSON.stringify({
                    userID, catData
                })
            })
            const data = await res.json()
            if (!data.success) return new MyResponse(false, "고양이 데이터 생성에 실패했습니다.", {})
            return new MyResponse(true, "고양이 데이터 생성에 성공했습니다.", {})
        } catch (error) {
            return new MyResponse(false, "고양이 데이터 생성에 실패했습니다.", String(error))
        }
    }
}
