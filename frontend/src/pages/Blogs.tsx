import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { SidebarSkeloton } from "../components/SidebarSkeloton";
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            <Appbar />
            <div className="pt-6"></div>
            <div className="max-w-[1336px] m-auto">
                <div className="flex justify-evenly">

                    <div className="lg:min-w-[728px] lg:max-w-[728px]">
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                    <div className="hidden lg:block lg:max-w-[368px] lg:min-w-[368px]">
                        <SidebarSkeloton />
                    </div>
                </div>
            </div>
        </div>
    }
    return (
        <>
            <Appbar />
            <div className="pt-6"></div>
            <div className="max-w-[1336px] m-auto">
                <div className="flex justify-evenly">

                    <div className="lg:min-w-[728px] lg:max-w-[728px]">

                        {blogs.map((blog, index) => {
                            return (
                                <BlogCard
                                    key={index}
                                    id={blog.id}
                                    authorName={blog.author.name || "Anonymous"}
                                    title={blog.title}
                                    content={blog.content}
                                    publishedDate={"24 sep 2024"}
                                />
                            )
                        })}


                    </div>
                    <div className="hidden lg:block lg:max-w-[368px] lg:min-w-[368px] p-8 lg:min-h-screen border-l border-[#f2f2f2]">
                        <h3>right side</h3>
                    </div>
                </div>

            </div>
        </>
    )
}
