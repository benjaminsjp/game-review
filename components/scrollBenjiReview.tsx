"use client";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ScrollBenjiReview() {
  function scrollRight() {
    document.querySelector("#scrollBox2")!.scrollLeft += 170;
  }
  function scrollLeft() {
    document.querySelector("#scrollBox2")!.scrollLeft -= 170;
  }

  return (
    <div className="inline-flex">
      <p
        className="items-end justify-end rounded-full bg-scrollButton p-2 ml-2 cursor-pointer hover:opacity-80 transition-all ease-out"
        onClick={() => scrollLeft()}
      >
        <IoIosArrowBack />
      </p>
      <p
        className="items-end justify-end rounded-full bg-scrollButton p-2 ml-2 cursor-pointer hover:opacity-80 transition-all ease-out"
        onClick={() => scrollRight()}
      >
        <IoIosArrowForward />
      </p>
    </div>
  );
}
