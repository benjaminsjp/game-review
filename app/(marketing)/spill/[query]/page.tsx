import Link from "next/link";
import Image from "next/image";
let myHeaders = new Headers();
myHeaders.append("client-id", `${process.env.GAME_DATABSE_CLIENT_ID}`);
myHeaders.append("Authorization", `Bearer ${process.env.ACCESSTOKEN}`);
myHeaders.append("Content-Type", "text/plain");
myHeaders.append(
  "Cookie",
  "__cf_bm=6BG8LmW4T7qSqRR01nm9MJEIOr7sO3STPAM5o78JPZY-1700474580-0-AYKKuyn92sOHDOLETwjAXcmstZceAn5oQ4t95LGMyYixin54DtbYAEpCgMHItV2YdrdhpWQWvFSlAx1PyJ7+z1U="
);

export default async function valgtSpill({ params }) {
  //dekoder parameter
  const decodedParams = decodeURIComponent(params.query);

  //Lager en funksjon som henter spillets informasjon basert på slugen til spillet. Slugen blir hentet når man trykker på spillets cover
  async function spill() {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: myHeaders,
      body: `fields *, cover.*; where slug = "${decodedParams}"; limit 1;`,
    });
    const valgtSpill = await response.json();
    return valgtSpill;
  }
  //Lager en annen funksjon som bruker databasen til å finne lignende spill
  async function lignendeSpillFetch(lignendeSpillId) {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: myHeaders,
      body: `fields *, cover.*; where id = ${lignendeSpillId}; limit 5;`,
    });
    const lignendeSpill = await response.json();
    return lignendeSpill;
  }

  //Lagrer informasjon om spillet brukeren har trykket på, og lignende spill
  const brukerValgSpill = await spill();
  const lignendeSpillId = brukerValgSpill[0].similar_games;

  //Passer på at alle de lignende spillene blir telt med
  const lignendeSpillListe = await Promise.all(
    lignendeSpillId.map(async (id) => await lignendeSpillFetch(id))
  );
  //Flater ut arrayet slik at programmet kan tolke det
  const flattedListe = lignendeSpillListe.flat();

  return (
    <main className="bg-white bg-opacity-40 backdrop-blur-md rounded drop-shadow-lg">
      <div className="flex flex-col justify-center items-center pb-10">
        <div className="flex flex-col w-2/3">
          <h1 className="text-2xl mb-6 underline decoration-accent">
            {brukerValgSpill[0].name}
          </h1>
          <div className="grid grid-row-1 md:grid-cols-3 grid-flow-cols gap-5 overflow-y-scroll">
            <div className="flex flex-col">
              <Image
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${brukerValgSpill[0].cover.image_id}.jpg`}
                alt=""
                width={300}
                height={0}
                className="rounded-sm w-50 h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl mb-6 underline decoration-accent">
                Story
              </h1>
              <p>{brukerValgSpill[0].storyline}</p>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl mb-6 underline decoration-accent">
                Rating
              </h1>
              {/* Runder vurderingen på spillet til et heltall så det ikke er noen desimaler */}
              <p>Score: {Math.floor(brukerValgSpill[0].total_rating)} / 100</p>
              <p>Antall: {brukerValgSpill[0].total_rating_count}</p>
              <h1 className="text-2xl mt-5 mb-6 underline decoration-accent">
                Min mening
              </h1>
              <p>90 / 100</p>
              <p className="pt-2">
                Jeg synes at dette spillet har en bra fortelling, og et
                fantastisk utseende
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-2/3 mt-20">
          <h1 className="text-2xl mb-6 underline decoration-accent">
            Lignende spill
          </h1>
          <div className="grid grid-row-1 md:grid-cols-5 grid-flow-cols gap-5 overflow-x-scroll">
            {/* Mapper lignende spill og viser dem i en grid */}
            {flattedListe.map((game) => (
              <div className="flex flex-col">
                <Link href={`/${game.slug}`}>
                  <Image
                    src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover.image_id}.jpg`}
                    alt=""
                    width={300}
                    height={0}
                    className="rounded-sm w-50 h-full object-cover"
                  />
                </Link>
                <p className="text-Text text-xl p-2 underline decoration-accent line-clamp-1">
                  {game.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
