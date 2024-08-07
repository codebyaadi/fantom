import { SiteHeader } from "@/components/layouts/site-header";

interface LobyLayoutProps
  extends React.PropsWithChildren<{
    modal: React.ReactNode;
  }> {}

export default async function LobyLayout({ children, modal }: LobyLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {children}
        {modal}
      </main>
    </div>
  );
}
