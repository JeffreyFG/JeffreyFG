"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import RepoCard from "@/app/components/ProjectsPage/RepoCard";
import repositoryType from "@/app/components/ProjectsPage/types/repositoryType";
import BodyComponent from "@/app/components/BodyComponent";
import Container from "react-bootstrap/esm/Container";
import userInterface from "@/app/interfaces/userInterface";

const MainProjectsPage = (properties: { isLoggedIn: boolean; setStateUser: Dispatch<SetStateAction<userInterface>> }) => {
  const [repositories, setRepositories] = useState<repositoryType[] | null>(null);
  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetch("https://api.github.com/users/JeffreyFG/repos");
        let data = await response.json();
        console.log(data);
        setRepositories(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <BodyComponent isloggedIn={properties.isLoggedIn} setStateUser={properties.setStateUser}>
      <section className="flex flex-col justify-center max-w-6xl min-h-screen px-4 py-10 mx-auto sm:px-6">
        <p className="text-center"> As part of the portfolio functionality of this website I have included my github repos</p>
        <div className="flex flex-wrap -mx-4">
          <>
            {repositories &&
              repositories.length > 0 &&
              repositories.map((repository, index) => {
                return <RepoCard key={index} repo={repository}></RepoCard>;
              })}
          </>
        </div>
      </section>
    </BodyComponent>
  );
};
export default MainProjectsPage;
