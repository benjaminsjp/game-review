import Link from "next/link";
import { Inter } from "next/font/google";
import igdb from "igdb-api-node";
import { request } from "http";
import Image from "next/image";

let myHeaders = new Headers();
myHeaders.append("client-id", `${process.env.GAME_DATABSE_CLIENT_ID}`);
myHeaders.append("Authorization", `Bearer ${process.env.ACCESSTOKEN}`);
myHeaders.append("Content-Type", "text/plain");
myHeaders.append(
  "Cookie",
  "__cf_bm=6BG8LmW4T7qSqRR01nm9MJEIOr7sO3STPAM5o78JPZY-1700474580-0-AYKKuyn92sOHDOLETwjAXcmstZceAn5oQ4t95LGMyYixin54DtbYAEpCgMHItV2YdrdhpWQWvFSlAx1PyJ7+z1U="
);

export default async function valgtSpill({ params }: { params: any }) {
  //dekoder parameter
  const decodedParams = decodeURIComponent(params.query);

  //Lager en funksjon som henter spillets informasjon basert på slugen til spillet. Slugen blir hentet når man trykker på spillets cover
  async function spill() {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: myHeaders,
      body: `fields name, slug, summary, total_rating, total_rating_count, similar_games, cover.image_id; where slug = "${decodedParams}"; limit 5;`,
    });
    const valgtSpill = await response.json();
    return valgtSpill;
  }
  //Lager en annen funksjon som bruker databasen til å finne lignende spill
  async function lignendeSpillFetch(lignendeSpillId: any) {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: myHeaders,
      body: `fields name, slug, cover.image_id; where id = ${lignendeSpillId};`,
    });
    const lignendeSpill = await response.json();
    return lignendeSpill;
  }

  //Lagrer informasjon om spillet brukeren har trykket på, og lignende spill
  const brukerValgSpill = await spill();
  const lignendeSpillId = brukerValgSpill[0].similar_games;

  //Passer på at alle de lignende spillene blir telt med
  const lignendeSpillListe = await Promise.all(
    lignendeSpillId.map(async (id: any) => await lignendeSpillFetch(id))
  );
  //Flater ut arrayet slik at programmet kan tolke det
  const flattedListe = lignendeSpillListe.flat();

  return (
    <main className="bg-white bg-opacity-40 backdrop-blur-md rounded drop-shadow-lg">
      <div className="flex flex-col justify-center items-center pb-10">
        <div className="flex flex-col w-2/3">
          <h1 className="text-2xl mb-6">{brukerValgSpill[0].name}</h1>
          <div className="grid grid-row-1 md:grid-cols-3 grid-flow-cols gap-5 overflow-y-scroll">
            <div className="flex flex-col">
              <Image
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${brukerValgSpill[0].cover.image_id}.jpg`}
                alt=""
                loading="lazy"
                width={300}
                height={0}
                className="rounded-sm w-50 h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl mb-6">Beskrivelse</h1>
              <p>{brukerValgSpill[0].summary}</p>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl mb-6 ">Rating</h1>
              {/* Runder vurderingen på spillet til et heltall så det ikke er noen desimaler */}
              <p>Score: {Math.floor(brukerValgSpill[0].total_rating)} / 100</p>
              <p>Antall: {brukerValgSpill[0].total_rating_count}</p>
              <h1 className="text-2xl mt-5 mb-6">Min mening</h1>
              <p>90 / 100</p>
              <p className="pt-2">
                Jeg synes at dette spillet har en bra fortelling, og et
                fantastisk utseende
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-2/3 mt-20">
          <h1 className="text-2xl mb-6">Spill som ligner på dette</h1>
          <div className="grid grid-row-1 md:grid-cols-5 grid-flow-cols gap-5 overflow-x-scroll">
            {/* Mapper lignende spill og viser dem i en grid */}
            {flattedListe.map((game) => (
              <div key={game.id} className="flex flex-col">
                <div className="overflow-hidden max-w-full max-h-full rounded-md">
                  <Link href={`/spill/${game.slug}`}>
                    <Image
                      src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover.image_id}.jpg`}
                      alt=""
                      loading="lazy"
                      width={1080}
                      height={1920}
                      className="w-full h-full hover:scale-105 transition-all duration-300"
                    />
                  </Link>
                </div>
                <p className="text-Text text-xl pt-1 line-clamp-1">
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
