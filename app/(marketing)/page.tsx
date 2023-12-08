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
    body: `search "${game}"; fields name, slug, cover.image_id, summary,screenshots.*, artworks.*; where category = 0; limit 5;`,
  });
  const games = await response.json();
  return games;
}

//HTML
export default async function Home() {
  const favGames = [
    "Subnautica",
    "Elden Ring",
    "Destiny 2",
    "God of War",
    "Dark Souls 3",
  ];

  const Subnautica = await games("Subnautica");
  const EldenRing = await games("Elden Ring");
  const Destiny = await games("Destiny 2");
  const GOW = await games("God of war");
  const GOW2 = await games("God Of War Ragnarok");
  const ds3 = await games("Dark souls 3");

  const randFav = await games(
    favGames[Math.floor(Math.random() * favGames.length)]
  );

  let favScreen;

  switch (randFav[0].name) {
    case "Subnautica":
      favScreen = randFav[0].artworks[6].image_id;
      break;
    case "Elden Ring":
      favScreen = randFav[0].screenshots[3].image_id;
      break;
    case "Destiny 2":
      favScreen = randFav[0].artworks[1].image_id;
      break;
    case "God of War":
      favScreen = randFav[0].screenshots[2].image_id;
      break;
    case "Dark Souls 3":
      favScreen = randFav[0].artworks[5].image_id;
      break;
    default:
      favScreen = randFav[0].artworks[0].image_id;
  }

  return (
    <main className="flex min-h-screen flex-col -mt-20 overflow-hidden">
      <div className="w-screen h-screen relative mb-10">
        <Image
          src={`https://images.igdb.com/igdb/image/upload/t_1080p/${favScreen}.jpg?`}
          alt={randFav[0].name}
          loading="lazy"
          width={1920}
          height={1080}
          className="h-[100vh] object-cover"
        />
        <div className="absolute top-36 left-20">
          <h1 className="text-6xl font-semibold">{randFav[0].name}</h1>
          <div className=" w-max p-3">
            <p className="w-52">
              10/10{" "}
              {'"Lorem ipsum dolor sit amet consectetur adipisicing elit."'}
            </p>
          </div>
        </div>
      </div>
      {/* Header */}
      <header className="flex ">
        <h1 className="text-3xl text-Text decoration-accent ml-20">
          Mine favoritter
        </h1>
      </header>

      <div>
        <div className="grid grid-cols-2 md:grid-cols-5 grid-flow-row  p-3 mt-2 mx-16 gap-16 mb-60">
          {/* Bruker Link funksjonen til Next.js som et anchor tag som skal sende bruker til en egen side for spillet de trykket på */}
          <div className="overflow-hidden max-w-12/12 max-h-12/12 rounded-md">
            <Link
              className=""
              //encodeURIComponent bruker jeg for at programmet kan tolke mellomrom i spill navnet
              href={`/spill/${encodeURIComponent(Subnautica[0].slug)}`}
            >
              {/* Henter et bilde fra IGDB sin database med bilde_id fra spillet */}
              <Image
                src={`https://images.igdb.com/igdb/image/upload/t_1080p/${Subnautica[0].cover.image_id}.jpg`}
                alt=""
                loading="lazy"
                width={200}
                height={200}
                className=" w-full h-full hover:scale-110 transition-all duration-500"
              />
            </Link>
          </div>
          <div className="overflow-hidden max-w-12/12 max-h-12/12 rounded-md">
            <Link
              className=""
              href={`/spill/${encodeURIComponent(EldenRing[0].slug)}`}
            >
              <Image
                src={`https://images.igdb.com/igdb/image/upload/t_1080p/${EldenRing[0].cover.image_id}.jpg`}
                alt=""
                loading="lazy"
                width={200}
                height={200}
                className=" w-full h-full hover:scale-110 transition-all duration-500"
              />
            </Link>
          </div>
          <div className="overflow-hidden max-w-12/12 max-h-12/12 rounded-md">
            <Link
              className=""
              href={`/spill/${encodeURIComponent(Destiny[0].slug)}`}
            >
              <Image
                src={`https://images.igdb.com/igdb/image/upload/t_1080p/${Destiny[0].cover.image_id}.jpg`}
                alt=""
                loading="lazy"
                width={200}
                height={0}
                className=" w-full h-full hover:scale-110 transition-all duration-500"
              />
            </Link>
          </div>
          <div className="overflow-hidden max-w-12/12 max-h-12/12 rounded-md">
            <Link
              className="place-self-center"
              href={`/spill/${encodeURIComponent(ds3[0].slug)}`}
            >
              <Image
                src={`https://images.igdb.com/igdb/image/upload/t_1080p/${ds3[0].cover.image_id}.jpg`}
                alt=""
                loading="lazy"
                width={200}
                height={0}
                className=" w-full h-full hover:scale-110 transition-all duration-500"
              />
            </Link>
          </div>
          <div className="overflow-hidden max-w-12/12 max-h-12/12 rounded-md">
            <Link
              className="place-self-center"
              href={`/spill/${encodeURIComponent(GOW[0].slug)}`}
            >
              <Image
                src={`https://images.igdb.com/igdb/image/upload/t_1080p/${GOW[0].cover.image_id}.jpg`}
                alt=""
                loading="lazy"
                width={200}
                height={0}
                className=" w-full h-full hover:scale-110 transition-all duration-500"
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
