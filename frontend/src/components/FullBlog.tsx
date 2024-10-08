import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"
import { Editor, EditorState, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html"
import DOMPurify from 'dompurify';

export const FullBlog = ({ blog }: { blog: Blog }) => {
    // Convert the blog content from the raw JSON to EditorState
    const isValidJSON = (string: string) => {
        try {
            JSON.parse(string);
            return true;
        } catch (e) {
            return false;
        }
    };
    let displayContent = blog.content;
    if (isValidJSON(blog.content)) {
        const rawContent = JSON.parse(blog.content); // Ensure it's in the right format
        // const contentState = convertFromRaw(rawContent);
        // const editorState = EditorState.createWithContent(contentState);
        const htmlContent = draftToHtml(rawContent);
        displayContent = DOMPurify.sanitize(htmlContent);
    }


    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12  w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8 px-6">
                    <div className="text-[42px] font-bold leading-[52px] text-[#242424]">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 2nd December 2023
                    </div>
                    <div className="pt-4 blog-content">
                        <div dangerouslySetInnerHTML={{ __html: displayContent }} />
                    </div>
                </div>
                <div className="col-span-4 px-6 border-l border-[#f2f2f2] min-h-screen">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size={6} name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
}