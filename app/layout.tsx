import "../styles/globals.scss";
import Nav from "./components/Nav";
import { Trispace } from "next/font/google";
import QueryWrapper from "./components/QueryWrapper";

const font = Trispace({
  subsets: ["latin"],
  weight: ["200", "400", "600"],
});

export const metadata = {
  title: "Tiny Post",
  description: "Home page of Tiny Post",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <QueryWrapper>
          {/* @ts-expect-error Server Component */}
          <Nav />
          {children}
        </QueryWrapper>
      </body>
    </html>
  );
}
