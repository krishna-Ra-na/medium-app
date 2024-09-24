import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return (
        <div className="flex justify-between  p-3 border-b-[1px] border-[#f2f2f2] px-10 py-4">
            <div className="text-2xl font-bold">medium</div>
            <Avatar size={10} name={"krishna"} />
        </div>
    )
}