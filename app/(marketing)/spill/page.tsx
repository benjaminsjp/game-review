import React from "react";
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

//Lager en funksjon som henter spill basert på hvor høy rating de har, men passer på at spillene har mer enn 150 anmeldelser så man får ønskede spill på toppen
async function gamesPopular() {
  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: myHeaders,
    body: `fields slug, cover.image_id;where category = 0 & rating_count > 150; sort rating desc; limit 12; `,
  });
  const gamesPopular = await response.json();
  return gamesPopular;
}

//Lager en variabel med spill informasjonen

async function Spill() {
  const popGame = await gamesPopular();

  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col w-2/3">
          <h1 className="text-2xl mb-6">Høyest Rangert</h1>
          <div className="grid grid-row-1 md:grid-cols-12 overflow-x-scroll grid-flow-cols scroll-smooth snap-mandatory gap-56 snap-x">
            {/* Mapper spillene som ble hentet fra funksjonen og displayer de i en grid */}
            {popGame.map(
              (game: { slug: any; cover: { image_id: any }; name: string }) => (
                <div key={game.slug} className="flex flex-col">
                  {/* Linker bildene til en dynamisk side som viser rating, story og annet. Jeg bruker slug som parameter slik at programmet ikke finner duplikat av spill */}
                  <div className="overflow-hidden w-52 h-72 rounded-md snap-always snap-end">
                    <Link href={`/spill/${game.slug}`}>
                      <Image
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover.image_id}.jpg`}
                        alt=""
                        loading="lazy"
                        width={1080}
                        height={1920}
                        className="w-52 h-72 hover:scale-105 transition-all duration-300 pb-3"
                      />
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex flex-col w-2/3 mt-20">
          <h1 className="text-2xl mb-6">Exempel</h1>
          <div className="grid grid-rows-2 grid-cols-5 gap-20">
            <div className="bg-Text w-52 h-72"></div>
            <div className="bg-Text w-52 h-72"></div>
            <div className="bg-Text w-52 h-72"></div>
            <div className="bg-Text w-52 h-72"></div>
            <div className="bg-Text w-52 h-72"></div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Spill;
