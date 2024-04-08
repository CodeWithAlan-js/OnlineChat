import { Input } from "@/components/ui/input";
import { useUser } from "@/context/userContext";

const InputName = () => {
    const { handleChange } = useUser()


    return (
        <div>
            <Input onChange={handleChange} placeholder="Enter your name" />
        </div>
    )

}

export default InputName;