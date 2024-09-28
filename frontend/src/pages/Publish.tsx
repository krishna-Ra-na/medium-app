import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DraftEditor from "../components/DraftEditor";
export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState<string>();
    const navigate = useNavigate();

    const handleDescriptionChange = (newDescription: string) => {
        setDescription(newDescription);
    };

    return <div>
        <Appbar />
        <div className="flex justify-center w-full pt-20">
            <div className="max-w-screen-lg w-full">

                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="mb-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" />
                <DraftEditor onChange={handleDescriptionChange} />
                {/* <TextEditor onChange={(e) => {
                    setDescription(e.target.value)
                }} /> */}
                <button onClick={async () => {
                    // console.log("des", description);
                    const jwt = localStorage.getItem("token");
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title,
                        content: description
                    }, {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
                }} type="submit" className="w-full  text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-4 text-center  items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 my-8">
                    Publish post
                </button>
            </div>
        </div>
    </div>
}


// function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
//     return <div className="mt-2">
//         <div className="w-full mb-4 ">
//             <div className="flex items-center justify-between border">
//                 <div className="my-2 bg-white rounded-b-lg w-full">
//                     <label className="sr-only">Publish post</label>
//                     <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required />
//                 </div>
//             </div>
//         </div>
//     </div>

// }

