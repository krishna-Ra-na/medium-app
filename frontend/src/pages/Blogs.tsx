import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Appbar />
            <div className="pt-6"></div>
            <div className="max-w-[1240px] m-auto">
                <div className="flex">

                    <div className="min-w-[728px]">
                        {blogs.map((blog) => {
                            return (
                                <BlogCard
                                    authorName={blog.author.name || "Anonymous"}
                                    title={blog.title}
                                    content={blog.content}
                                    publishedDate={"24 sep 2024"}
                                />
                            )
                        })}


                    </div>
                    <div>
                        <h3>right side</h3>
                    </div>
                </div>

            </div>
        </>
    )
}
