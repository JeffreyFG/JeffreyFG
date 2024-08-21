import Header from "./Header";

export default function BodyComponent({ children }: { children: any }) {
  return (
    <>
      <Header></Header>
      {children}
    </>
  );
}
