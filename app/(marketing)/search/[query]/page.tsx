import Link from "next/link";
import { Inter } from "next/font/google";
import igdb from "igdb-api-node";
import { request } from "http";
import Image from "next/image";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";

let myHeaders = new Headers();
myHeaders.append("client-id", `${process.env.GAME_DATABSE_CLIENT_ID}`);
myHeaders.append("Authorization", `Bearer ${process.env.ACCESSTOKEN}`);
myHeaders.append("Content-Type", "text/plain");
myHeaders.append(
  "Cookie",
  "__cf_bm=6BG8LmW4T7qSqRR01nm9MJEIOr7sO3STPAM5o78JPZY-1700474580-0-AYKKuyn92sOHDOLETwjAXcmstZceAn5oQ4t95LGMyYixin54DtbYAEpCgMHItV2YdrdhpWQWvFSlAx1PyJ7+z1U="
);

export default async function Result({ params }: { params: any }) {
  //Decoder paramenter som har blitt encoded tidligere slik at programmet kan tolke mellomrom
  const decodedParams = decodeURIComponent(params.query);
  //Lager en funksjon som henter spill basert på hva bruker tastet inn i søkefeltet
  async function searchedGame() {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: myHeaders,
      body: `search "${decodedParams}";fields *, cover.*, platforms.*; limit 25; `,
    });
    const searchedGame = await response.json();
    return searchedGame;
  }
  //Lagrer spillene og spill informasjonen i en variabel
  const searchResult = await searchedGame();

  return (
    <main>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col w-2/3">
          <h1 className="text-2xl mb-6 underline decoration-accent ">
            Resutater for {decodedParams}
          </h1>
          <div className="grid grid-row-1 md:grid-cols-5 grid-flow-cols gap-5 overflow-x-scroll mb-5">
            {/* Mapper søkeresultater, filtrerer ut spill uten et bilde og derreter setter inn bilder som lenker til spillets spill side */}
            {searchResult
              .filter(
                (game: { cover: { image_id: any } }) =>
                  game.cover && game.cover.image_id
              ) // Filtrer ut spill uten coverbilder
              .map(
                (game: {
                  id: Key | null | undefined;
                  slug: string | number | boolean;
                  cover: { image_id: any };
                  name:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | PromiseLikeOfReactNode
                    | null
                    | undefined;
                }) => (
                  <div
                    key={game.id}
                    className="flex flex-col" /* Legg til nødvendig nøkkel for hvert element */
                  >
                    <Link href={`/spill/${encodeURIComponent(game.slug)}`}>
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
                )
              )}
          </div>
        </div>
      </div>
    </main>
  );
}
