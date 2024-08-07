import Container from "@/lib/container";
import Image from "next/image";
import Components from "./components";
import CheckSession from "@/utils/check_session";

export default async function Page() {

    return (
        <Container.Main headerTitle="내 고양이" badge>
            <div className="flex flex-col items-center justify-between relative w-full h-full gap-5">
                <div className="flex flex-col items-center w-full gap-5 relative">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/stardenburdenhardenbart-kairos.appspot.com/o/website_images%2Fsample_pet.png?alt=media&token=0dc2e7c4-d7f0-4365-b0e9-f0deedc88735"
                        alt="내 고양이"
                        width={150}
                        height={150}
                    />
                    <Components.CatInfo />
                </div>

                <Components.InteractionGroup />
            </div>
            <CheckSession alertNoSession />
        </Container.Main>
    )
}