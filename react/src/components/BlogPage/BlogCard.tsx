import { useState } from "react";
import { blogPost } from "./types/BlogPost";
import Button from "react-bootstrap/esm/Button";
import Collapse from "react-bootstrap/esm/Collapse";
import { ArrowDown, ArrowUp } from "react-bootstrap-icons";
export default function BlogCard(blogPostArgument: blogPost) {
  const [open, setOpen] = useState<boolean>(false);
  const calculatedShortDescription: string = blogPostArgument.description.substring(0, 300) + ".... ";
  const [shortDescription, setShortDescription] = useState<string>(calculatedShortDescription);
  const [buttonText, setButtonText] = useState<string>("Read More");
  const isDescriptionLong: boolean = blogPostArgument.description.length > 300;
  const imageStyle = { width: "100%" };
  return (
    <div className="col">
      <div className="card shadow-sm">
        <a href={"/blog/imagePost/" + blogPostArgument._id} className="anchor-buttons">
          <img className="card-image-post" alt="Picture from blog post" style={imageStyle} src={"/images/uploads/" + blogPostArgument.photoPath} />
        </a>
        <div className="card">
          <div className="card-body">
            <h1>{blogPostArgument.title}</h1>
            {isDescriptionLong ? (
              <>
                <p>{shortDescription}</p>
                <Collapse in={open}>
                  <div id="example-collapse-text">{blogPostArgument.description}</div>
                </Collapse>
                <Button
                  className="accordion-button"
                  type="button"
                  onClick={() => {
                    if (open) {
                      setShortDescription(calculatedShortDescription);
                      setButtonText("Read More");
                    } else {
                      setShortDescription("");
                      setButtonText("Read Less");
                    }

                    setOpen(!open);
                  }}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  {buttonText}
                  {open && <ArrowUp size={20} />}
                  {!open && <ArrowDown size={20} />}
                </Button>
              </>
            ) : (
              <p>{blogPostArgument.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
