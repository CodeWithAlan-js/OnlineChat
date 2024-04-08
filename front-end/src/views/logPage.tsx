import { Button } from "@/components/ui/button";
import { CiHeart } from "react-icons/ci";
import InputName from "@/components/inputName";

const LogPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-2/5 flex flex-col justify-around">
        <div className="w-full flex flex-col items-center gap-3">
          <p className="text-5xl font-bold text-text-primary font-Montserrat">
            LoveLoop
          </p>
          <div className="flex items-center w-full justify-center gap-1">
            <p className="font-Indie text-xl">Online chat for finding love</p>
            <CiHeart className="text-2xl text-text-primary" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <InputName />
          <Button>Start Chatting</Button>
        </div>
      </div>
    </div>
  );
};

export default LogPage;
