import repositoryType from "./types/repositoryType";
export default function RepoCard(properties: { repo: repositoryType }) {
  return (
    <div className="w-full max-w-full rounded overflow-hidden shadow-lg m-1s sm:w-1/3 px-4 lg:w-1/4 flex flex-col">
      <a href={properties.repo.html_url}>
        <img className="w-full" src="/images/github-mark.svg" alt="Sunset in the mountains" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{properties.repo.name}</div>
          <p className="text-gray-700 text-base">According to GitHub this project is mainly written in {properties.repo.language}</p>
        </div>
      </a>
    </div>
  );
}
