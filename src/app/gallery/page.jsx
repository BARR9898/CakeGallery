import {GET} from "../api/cakes/route"
import CakeCard from "../(components)/CakeCard"

async function loadCakes() {
  try {
    const response = await fetch('http://localhost:3000/api/cakes');
    if (!response.ok) {
      throw new Error('Failed to fetch cakes');
    }
    const cakes = await response.json();
    console.log('Cakes fetched', cakes);
    return cakes.cakes;
  } catch (error) {
    console.error('Error loading cakes:', error);
    return []; // Retorna un array vacío en caso de error
  }
}
  
  export const dynamic = 'force-dynamic'
  
  async function Cakes() {
  
    
    const cakes = await loadCakes()
  
    return <div className="grid gap-4 grid-cols-1 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <section className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 h-9 p-2 flex items-center justify-center my-2">
        <h1 className="text-3xl font-bold">Galería</h1>
      </section>
      {cakes.map(cake => (
          <CakeCard cake={cake} key={cake.id} />
      ))}
    </div>;
  }
export default Cakes