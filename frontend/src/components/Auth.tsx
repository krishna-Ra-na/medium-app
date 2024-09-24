import { Link, useNavigate } from "react-router-dom"
import { InputBox } from "./InputBox"
import { SignupType, } from "@krishna-rana/common-medium-app"
import { useState } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"



export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();;
    const [postInputs, setPostInputs] = useState<SignupType>({
        name: "",
        email: "",
        password: ""
    })
    async function sendRequest() {
        console.log(postInputs)
        try {

            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)

            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs")

        } catch (error) {
            // add alert lib or somthimg
            alert("Error while signing up")

        }
    }
    return (
        <div className="h-screen flex justify-center items-center text-center">
            <div className="flex flex-col ">
                <div className="px-10">
                    <h2 className="text-4xl font-extrabold ">{type === "signup" ? "Create an account" : "Sign in to your account"}</h2>
                    <p className="text-slate-600 p-2 text-md font-semibold">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className="underline" to={type === "signin" ? "/signup" : "/signin"}> {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </p>
                </div>
                <div className="">
                    {type === "signup" ? <InputBox type="text" onChange={(e) => {
                        setPostInputs((prev) => {
                            return { ...prev, name: e.target.value }
                        })
                    }} label="Username" placeholder="Enter your username" /> : null}
                    <InputBox type="email" onChange={(e) => {
                        setPostInputs((prev) => {
                            return { ...prev, email: e.target.value }
                        })
                    }} label="Email" placeholder="m@example.com" />
                    <InputBox type="password" onChange={(e) => {
                        setPostInputs((prev) => {
                            return { ...prev, password: e.target.value }

                        })
                    }} label="Password" placeholder="" />
                </div>
                <div className="p-3 text-center">
                    <button onClick={sendRequest} type="button" className="w-full  text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-4 text-center  items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2">
                        {type === "signup" ? "Sign up" : "Sign in"}
                    </button>
                </div>
            </div>
        </div>
    )
}