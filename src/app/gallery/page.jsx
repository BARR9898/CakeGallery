import {GET} from "../api/cakes/route"
import CakeCard from "../(components)/CakeCard"
async function loadCakes() {
    const cakes = await GET()
    console.log('CAKES GATED',await GET());
    return cakes
    
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