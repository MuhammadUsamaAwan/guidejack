export function HowItWorks() {
  return (
    <section className='w-full text-left'>
      <h2 className='mb-2 font-semibold text-2xl'>How It Works</h2>
      <ul className='list-disc space-y-2 pl-6 text-muted-foreground'>
        <li>
          Upload your <code>.wabbajack</code> file.
        </li>
        <li>We parse everything and handle the mod-magic behind the scenes ✨</li>
        <li>Voilà — a readable, shareable, manual modding guide.</li>
      </ul>
    </section>
  );
}
