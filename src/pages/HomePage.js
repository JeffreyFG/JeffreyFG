import React from "react";
import BodyComponent from "../components/Body.js"
export default function Home()
{
    return(
    <>
        <BodyComponent>
        <div className="container mt-5 mb-5">
            <div className="row no-gutters">
            <div className="col-md-4 col-lg-4"><img src="../images/profilePicture.jpeg"/></div>
                <div className="col-md-8 col-lg-8">

                    <div className="d-flex flex-column">

                        <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                        
                            <h3 className="display-5">Jeffrey Fulmer Gardner</h3></div>
                        <div className="p-3 bg-black text-white">
                            <p>
                            
                            Hello, thank you for coming to my website, My name is Jeffrey Fulmer Gardner. 
                            I am a San Francisco Native with a passion for software development. 
                            I have been developing my software development skills for years by first Attending CCSF where 
                            I got my associates degree in computer Science. I am currently attending SFSU in pursuit of a 
                            Bachelors in computer science. I wanted to create this site so that I could fill that section on 
                            job applications and have a page of my own to show off my computer programing skills. This site is 
                            built on express and Nodejs is hosted by me. From hardware configuration to final website, I have 
                            created this with my own skills. I will continue to add features and improve the look of my website 
                            over time.
                            </p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        </BodyComponent>
    </>)
}