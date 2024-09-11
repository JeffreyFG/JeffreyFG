import repositoryType from "./types/repositoryType";
export default function RepoCard(properties: { repo: repositoryType }) {
  return (
    <div className="col">
      <a href={properties.repo.html_url}>
        <div className="card shadow-sm">
          <img
            src="/images/github-mark.svg"
            alt="Avatar"
            style={{ width: 100 + "%" }}
          ></img>

          <div className="card-body">
            <h1>{properties.repo.name}</h1>
            <p className="card-text">
              According to GitHub this project is mainly written in{" "}
              {properties.repo.language}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group"></div>
              <small className="text-muted">9 mins</small>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
