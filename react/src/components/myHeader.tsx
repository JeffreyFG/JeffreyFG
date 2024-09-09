import "bootstrap/dist/js/bootstrap.min.js";

export default function myHeader({ children = "" }: { children: any }) {
  return <header>{children}</header>;
}
