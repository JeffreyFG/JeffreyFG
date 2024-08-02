import { useEffect, useState } from "react";
import RepoCard from "../components/ProjectsPage/RepoCard.tsx";
import Body from "../components/Body.tsx"
import repositoryType from "../components/ProjectsPage/types/repositoryType.ts";


export default function MainProjectsPage() 
{

  const [repositories, setRepos] = useState<repositoryType[] | null>(null);
  useEffect(() => {

    const getData = async () => {
      try {
        let response = await fetch("https://api.github.com/users/JeffreyFG/repos");
        let data = await response.json();
        console.log(data)
        setRepos(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  
    return(
      <Body>
      <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">React Example</h1>
          <p className="lead text-muted">I created this page to show how react can be integrated into a static website.</p>
          <p className="lead text-muted">This section of the site uses both React for frontend rendering and Bootstrap for front end styling, and recreates my project section using these technologies.</p>
        </div>
      </div>
    </section>
    
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <>
          { repositories?(
            
               repositories.length > 0 && repositories.map((repository) => {<div className="col"><RepoCard {...repository}></RepoCard></div>})
            ): (
              <div>Loading...</div>)}
        </>
      </div>
      </div>
    </div>
      </Body>
      )
}