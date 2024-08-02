import { routeType } from "./types/routeType"
export default function NavBarElement(routeArgument:routeType) 
{
  return (<>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href={routeArgument.route}> {routeArgument.routeName}</a> 
            </li>
          </>)
}