import React from "react";

export default function BlogCard({_id,title,description,photoPath}) {


  return (
    <div className="col">
    <div className="card shadow-sm">
        <img  className="card-image-post" src ={"../../images/uploads/"+photoPath}></img>
        <div>

        </div>
            <a href={"/blog/imagePost/"+_id} className="anchor-buttons">
            <div className="card">
                <div className="card-body">
                <h1>{title}</h1>
                <p>{description}</p> 
                </div> 
            </div>    
            </a>
        </div>
        </div>
        )
}
/*
<h1>{blog.title}</h1>
                    <p>{blog.description}</p> 
 <a href={repo.urlForRepo}>
    <div className="card shadow-sm">
    <img src="../../images/matrix-code.jpg" alt="Avatar" style={{width:100+"%"}}></img>

    <div className="card-body">
      <h1>{repo.nameOfRepo}</h1> 
      <p className="card-text">According to GitHub this project is mainly written in {repo.repoLanguage}</p>
      <div className="d-flex justify-content-between align-items-center">
        <div className="btn-group">
        </div>
        <small className="text-muted">9 mins</small>
      </div>
    </div>
  </div></a>)
*/