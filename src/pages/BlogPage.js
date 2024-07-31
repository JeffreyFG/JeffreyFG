import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogPage/BlogCard.js"
import Body from "../components/Body.js"
export default function BlogPage() 
{
  const [blogPosts, setUsers] = useState([]);
  useEffect(() => {

    const getData = async () => {
      try {
        let response = await fetch("/blog/getRecentPosts/");
        let data = await response.json();
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  
    return(<>
      <Body></Body>
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
          
        <>{blogPosts.length > 0 && blogPosts.map((blogPosts) => <BlogCard  key={blogPosts._id} {...blogPosts}> </BlogCard>)}</>
        
      </div>
      </div>
    </div>
      </>)
}
/**/