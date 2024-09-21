export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full flex flex-col gap-4 py-8 md:py-10">
      <div className="w-full inline-block max-w-4/5 text-justify justify-center">
        {children}
      </div>
    </section>
  );
}
