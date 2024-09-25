import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string,
    title: string;
    content: string;
    publishedDate: string
    id: string
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return (<>
        <Link to={`/blog/${id}`}>
            <article>
                <div className="p-4 flex max-h-[450px]">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <Avatar size={5} name={authorName} />
                            {authorName} . {publishedDate}
                        </div>
                        <div className=" ">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#242424] dark:text-white">  {title}</h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">{content.slice(0, 100) + "..."}</p>
                        </div>

                        <div>
                            <span className="text-slate-400">{`${Math.ceil(content.length / 100)} minutes`} read</span>
                        </div>

                    </div>
                    <div>
                        <img src="" alt="" />
                    </div>
                </div>
            </article>

            <div className="mt-5 border border-b-1 border-[#f2f2f2]">

            </div>
        </Link>
    </>

    )
}


export function Avatar({ name, size = 5 }: { name: string, size?: number }) {
    return (
        <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
    )
}
export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}