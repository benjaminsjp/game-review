"use client";

//Lager et enkelt søkefelt som tar inn parameter, encoder parameter i tilfelle det er mellomrom, og sender bruker til den dynamiske ruten når "Enter knappen blir trykket på"

export default function SearchBar() {
  return (
    <main className="h-screen bg-white bg-opacity-40 backdrop-blur-md rounded drop-shadow-lg">
      <div className="h-1/2 flex justify-center items-center ">
        <div className="text-left">
          <input
            className="border-solid border-searchbr border-2 mb-5 sticky top-0 bg-searchBg p-5 px-10 rounded-2xl focus:outline-none focus:opacity-80 "
            placeholder="Search:"
            autoFocus
            type="search"
            onKeyUp={(event) =>
              event.key === "Enter" &&
              window.location.replace(
                "/search/" +
                  encodeURIComponent((event.target as HTMLInputElement).value)
              )
            }
          />
        </div>
      </div>
    </main>
  );
}
