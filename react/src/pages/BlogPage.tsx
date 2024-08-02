import { useEffect, useState } from "react";
import BlogCard from "../components/BlogPage/BlogCard.tsx"
import Body from "../components/Body.tsx"
import { blogPost } from "../components/BlogPage/types/BlogPost.ts";

export default function BlogPage() 
{
  const [blogPosts, setBlogs] = useState<blogPost[] | null>(null);
  useEffect(() => {

    const getData = async () => 
    {
      try 
      {
        let response = await fetch("localhost:3000/api/blog/getRecentPosts/");
        let data = await response.json();
        setBlogs(data);
      } 
      catch (err) 
      {
        err
      }
    };
    getData();
  }, []);
  
    return(<Body> <>
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">React Blog Example</h1>
          <p>On this page have recreated my original blog page using React </p>

        </div>
      </div>
    </section>
    
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"> 
        <>
        {
          blogPosts?(blogPosts.length > 0 && blogPosts.reverse().map((blogPostParameter) =>{ <BlogCard {...blogPostParameter}/>})):
          <div>Loading...</div>
        }
        </>  
        </div>
      </div>
    </div>
      </></Body>);
     
}
/**/