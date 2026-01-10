export default async function FilmDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  
  const {id} = await params; 
  return (

    <main>
      <h1>Film Detail</h1>
      <p>Film ID: {id}</p>
    </main>
  );
}