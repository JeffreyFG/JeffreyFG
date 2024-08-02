import { blogPost } from "./types/BlogPost";
export default function BlogCard(blogPostArgument:blogPost) {


  return (
    <div className="col">
    <div className="card shadow-sm">
        <img  className="card-image-post" src ={"/public/images/uploads/"+blogPostArgument.photoPath}></img>
        <div>

        </div>
            <a href={"/blog/imagePost/"+blogPostArgument._id} className="anchor-buttons">
            <div className="card">
                <div className="card-body">
                <h1>{blogPostArgument.title}</h1>
                <p>{blogPostArgument.description}</p> 
                </div> 
            </div>    
            </a>
        </div>
        </div>
        )
}