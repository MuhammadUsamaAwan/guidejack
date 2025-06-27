export function KnownIssues() {
  return (
    <section>
      <h2 className='mb-2 font-semibold text-2xl'>🐞 Known Issues</h2>
      <ul className='list-disc space-y-2 pl-6 text-muted-foreground'>
        <li>
          📦 Extremely large modlists (like <strong>LoreRim</strong>) may fail to process or cause the browser to hang.
          We're looking into optimizing this!
        </li>
      </ul>
    </section>
  );
}
