import myUrl from "@/domain/my_url";
import MyResponse from "../MyResponse"
import { auth } from "@/firebase"
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";


export default class EmailSignUpUseCase {
    private email: string = ""
    private password: string = ""
    private name: string = ""
    private userID: string = ""

    async verifyInput(
        email: string,
        password: string,
        passwordCheck: string,
        name: string
    ): Promise<MyResponse> {
        try {
            //이메일 정규식 확인
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) return new MyResponse(false, "이메일 형식에 맞게 써 주세요.", {})
            this.email = email
            //패스워드 로직 통과하는지 확인
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
            if (passwordRegex.test(password)) return new MyResponse(false, "비밀번호는 알파벳, 특수문자와 숫자를 포함한 6자 이상의 문자로 구성해야 합니다.", {})

            //패스워드 체크가 일치하는지 확인
            if (passwordCheck !== password) return new MyResponse(false, "비밀번호가 일치하지 않습니다.", {})
            this.password = password
            //name 빈 string 아닌지 확인
            if (name === "") return new MyResponse(false, "이름을 입력해주세요", {})
            this.name = name

            return new MyResponse(true, "유효성 검사에 성공했습니다.", {})
        } catch (error) {
            return new MyResponse(false, "유효성 검사에 실패했습니다.", String(error))
        }
    }

    async signUp(): Promise<MyResponse> {
        try {
            const response = await createUserWithEmailAndPassword(auth, this.email, this.password)
            this.userID = response.user.uid

            return new MyResponse(true, "인증에 성공했습니다.", this.userID)
        } catch (error) {
            return new MyResponse(false, "인증에 실패했습니다.", String(error))
        }
    }

    async deleteAuth(): Promise<MyResponse> {
        try {
            const user = auth.currentUser
            if(!user) return new MyResponse(false, "계정 삭제에 실패했습니다.", {})
            await deleteUser(user)
            return new MyResponse(true, "계정 삭제에 성공했습니다.", {})
        } catch (error) {
            return new MyResponse(false, "계정 삭제에 실패했습니다.", String(error))
        }
    }

    async createUser(): Promise<MyResponse> {
        try {
            const userData: UserModel = {
                email: this.email,
                name: this.name,
                playTime: 0,
            }
            const userID = this.userID
            const res = await fetch(`${myUrl}/api/v1/user/create`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userData,
                    userID
                })
            })
            const data = await res.json()
            if (!data.success) return new MyResponse(false, "유저 데이터 생성에 실패했습니다.", {})

            sessionStorage.setItem("uid", this.userID)
            return new MyResponse(true, "유저 데이터 생성에 성공했습니다.", data.data)
        } catch (error) {
            return new MyResponse(false, "유저 데이터 생성에 실패했습니다.", String(error))
        }
    }
}
