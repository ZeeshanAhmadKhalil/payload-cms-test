export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>Payload + Next Page Builder (Demo)</h1>
      <p>
        Use the Payload admin at
        {' '}
        <a href="http://localhost:3001/admin">http://localhost:3001/admin</a>
        {' '}
        to create a Page with blocks.
      </p>
      <p>
        Preview any page at
        {' '}
        <code>http://localhost:3000/preview/&lt;slug&gt;</code>.
      </p>
    </main>
  );
}
