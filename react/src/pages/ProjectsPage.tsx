import { useEffect, useState } from "react";
import RepoCard from "../components/ProjectsPage/RepoCard.tsx";
import repositoryType from "../components/ProjectsPage/types/repositoryType.ts";
import BodyComponent from "../components/BodyComponent.tsx";
import Container from "react-bootstrap/esm/Container";

export default function MainProjectsPage() {
  const [repositories, setUsers] = useState<repositoryType[] | null>(null);
  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetch("https://api.github.com/users/JeffreyFG/repos");
        let data = await response.json();
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <BodyComponent>
      <Container>
        <p className="text-center"> As part of the portfolio functionality of this website I have included my github repos</p>
      </Container>
      <div className="album py-5 bg-light">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <>
            {repositories &&
              repositories.length > 0 &&
              repositories.map((repository, index) => {
                return <RepoCard key={index} {...repository}></RepoCard>;
              })}
          </>
        </div>
      </div>
    </BodyComponent>
  );
}
