import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BlogCard from "../components/BlogPage/BlogCard.tsx";
import BodyComponent from "../components/BodyComponent.tsx";
import { blogPost } from "../components/BlogPage/types/BlogPost.ts";
import userInterface from "../interfaces/userInterface.ts";
const BlogPage = (properties: {
  isLoggedIn: boolean;
  setStateUser: Dispatch<SetStateAction<userInterface>>;
}) => {
  const [blogPosts, setBlogs] = useState<blogPost[] | null>(null);
  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetch("/api/blog/getRecentPosts");
        let data = await response.json();
        setBlogs(data);
      } catch (err) {
        err;
      }
    };
    getData();
  }, []);

  return (
    <BodyComponent
      isloggedIn={properties.isLoggedIn}
      setStateUser={properties.setStateUser}
    >
      <section>
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Jeffrey's Personal Blog</h1>
            <p>
              Welcome to my blog. I post here time to time in order to catalog
              work and or technologies that I am excited about
            </p>
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <>
            {blogPosts &&
              blogPosts.length > 0 &&
              blogPosts.reverse().map((blogPostParameter, index) => {
                return <BlogCard key={index} {...blogPostParameter} />;
              })}
          </>
        </div>
      </div>
    </BodyComponent>
  );
};
export default BlogPage;
/**/
