import { blogPost } from "./types/BlogPost";
export default function BlogCard(blogPostArgument:blogPost) {
    const imageStyle= {width:"100%"}

  return (
    <div className="col">
    <div className="card shadow-sm">
    <a href={"/blog/imagePost/"+blogPostArgument._id} className="anchor-buttons">
        
        <img  className="card-image-post" alt="Avatar" style={imageStyle} src ={"/images/uploads/"+blogPostArgument.photoPath}></img>
        </a>
        <div>

        </div>
            
            <div className="card">
                <div className="card-body">
                <h1>{blogPostArgument.title}</h1>
                <p>{blogPostArgument.description}</p> 
                </div> 
            </div>    
           
        </div>
        </div>
        )
}