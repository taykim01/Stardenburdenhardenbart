import MyResponse from "../MyResponse";

export default class ReadCatUseCase{
    async read():Promise<MyResponse>{
        try {
            const userID = sessionStorage.getItem('uid')
            const res = await fetch(`http://localhost:3000/api/v1/cat/read`, {
                headers: { "Content-type": "application/json" },
                method: "POST",
                body : JSON.stringify({
                    userID
                })
            })
            const data = await res.json()
            if(!data.success) return new MyResponse(false, "고양이 데이터 조회에 실패했습니다.", data.data)
            return new MyResponse(true, "고양이 데이터 조회에 성공했습니다.", data.data)
        } catch (error) {
            return new MyResponse(false, "고양이 데이터 조회에 실패했습니다.", String(error))
        }
    }
}