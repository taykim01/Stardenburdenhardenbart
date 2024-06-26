import { auth, provider } from "@/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import MyResponse from "../MyResponse"

export default class LogInUseCase {
    async signUp(): Promise<MyResponse> {
        try {
            const response = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(response);
            if (!credential) return new MyResponse(true, "이미 인증된 사용자", response.user)
            return new MyResponse(true, "인증에 성공했습니다.", response.user)
        } catch (error) {
            return new MyResponse(false, "인증에 실패했습니다.", String(error))
        }
    }
}
