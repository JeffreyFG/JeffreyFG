import React, { useEffect, useState } from "react";

export default function NavBarElement({ route, routeName}) 
{
  return (<>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href={route}> {routeName}</a> 
            </li>
          </>)
}