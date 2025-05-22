export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl flex-col gap-12 min-h-[60vh] flex items-center justify-center">{children}</div>
  );
}
