import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PropLink — Find Your Place",
  description:
    "PropLink connects people with properties to rent, buy and list across Zimbabwe.",
  applicationName: "PropLink",
  keywords: [
    "PropLink",
    "Zimbabwe properties",
    "houses for rent",
    "houses for sale",
    "Bulawayo properties",
    "Harare properties",
    "property marketplace",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
