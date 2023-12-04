import Link from "next/link";
import { Inter } from "next/font/google";
import igdb from "igdb-api-node";
import { request } from "http";
import Image from "next/image";

const res = igdb(
  process.env.GAME_DATABASE_SECRET,
  process.env.GAME_DATABSE_CLIENT_ID
);
// console.log(res);

let myHeaders = new Headers();
myHeaders.append("client-id", `${process.env.GAME_DATABSE_CLIENT_ID}`);
myHeaders.append("Authorization", `Bearer ${process.env.ACCESSTOKEN}`);
myHeaders.append("Content-Type", "text/plain");
myHeaders.append(
  "Cookie",
  "__cf_bm=6BG8LmW4T7qSqRR01nm9MJEIOr7sO3STPAM5o78JPZY-1700474580-0-AYKKuyn92sOHDOLETwjAXcmstZceAn5oQ4t95LGMyYixin54DtbYAEpCgMHItV2YdrdhpWQWvFSlAx1PyJ7+z1U="
);

//Spill queries

//Fetcher autentiserings nøkkel

// fetch(
//   `https://id.twitch.tv/oauth2/token?client_id=${process.env.GAME_DATABSE_CLIENT_ID}&client_secret=${process.env.GAME_DATABSE_SECRET}&grant_type=client_credentials`
// )
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

//fetcher ønsket spill
async function games(game: string) {
  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: myHeaders,
    body: `search "${game}"; fields name, slug, cover.image_id; limit 5;`,
  });
  const games = await response.json();
  return games;
}

//HTML
export default async function Home() {
  //Lager variabler som henter informasjon fra "games" funksjonen med spill parameter
  const Subnautica = await games("Subnautica");
  const EldenRing = await games("Elden Ring");
  const Destiny = await games("Destiny 2");
  const GOW = await games("God of war");
  const GOW2 = await games("God Of War Ragnarok");
  const ds3 = await games("Dark souls 3");
  console.log();
  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex justify-center sticky">
        <h1 className="text-3xl text-Text underline decoration-accent">
          Mine favoritter
        </h1>
      </header>

      <div>
        <div className="grid grid-cols-2 md:grid-cols-5 grid-flow-row  p-3 mt-10">
          {/* Bruker Link funksjonen til Next.js som et anchor tag som skal sende bruker til en egen side for spillet de trykket på */}
          <Link
            className="place-self-center"
            //encodeURIComponent bruker jeg for at programmet kan tolke mellomrom i spill navnet
            href={`/spill/${encodeURIComponent(Subnautica[1].slug)}`}
          >
            {/* Henter et bilde fra IGDB sin database med bilde_id fra spillet */}

            <Image
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${Subnautica[1].cover.image_id}.jpg`}
              alt=""
              loading="lazy"
              width={280}
              height={0}
              className="rounded-sm w-50 h-full hover:scale-110 transition-all duration-500"
            />
          </Link>
          <Link
            className="place-self-center"
            href={`/spill/${encodeURIComponent(EldenRing[0].slug)}`}
          >
            <Image
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${EldenRing[0].cover.image_id}.jpg`}
              alt=""
              loading="lazy"
              width={280}
              height={0}
              className="rounded-sm w-50 h-full hover:scale-110 transition-all duration-500"
            />
          </Link>
          <Link
            className="place-self-center"
            href={`/spill/${encodeURIComponent(Destiny[0].slug)}`}
          >
            <Image
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${Destiny[0].cover.image_id}.jpg`}
              alt=""
              loading="lazy"
              width={280}
              height={0}
              className="rounded-sm w-50 h-full hover:scale-110 transition-all duration-500"
            />
          </Link>
          <Link
            className="place-self-center"
            href={`/spill/${encodeURIComponent(ds3[0].slug)}`}
          >
            <Image
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${ds3[0].cover.image_id}.jpg`}
              alt=""
              loading="lazy"
              width={280}
              height={0}
              className="rounded-sm w-50 h-full hover:scale-110 transition-all duration-500"
            />
          </Link>
          <Link
            className="place-self-center"
            href={`/spill/${encodeURIComponent(GOW[0].slug)}`}
          >
            <Image
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${GOW[0].cover.image_id}.jpg`}
              alt=""
              loading="lazy"
              width={280}
              height={0}
              className="rounded-sm w-50 h-full hover:scale-110 transition-all duration-500"
            />
          </Link>
        </div>

        <div className="mx-20 mt-10 bg-secondary/30 rounded-3xl">
          <div className="px-20 pt-10">
            <div className="flex p-5 justify-center mb-5">
              <div>
                <h1 className="text-3xl pb-2 underline decoration-accent">
                  Latest Review
                </h1>
                <p className="text-lg flex flex-auto w-96">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatem aspernatur placeat vel tenetur. Cum nesciunt fugit
                  inventore magni, nemo soluta error neque ab corporis enim
                  mollitia repellat corrupti. Aperiam, voluptatibus.
                </p>
              </div>
              <div>
                <Image
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${GOW2[0].cover.image_id}.jpg`}
                  alt=""
                  width={280}
                  height={0}
                  loading="lazy"
                  className="rounded-lg w-50 h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
