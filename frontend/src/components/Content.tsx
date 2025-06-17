export default function Content() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 font-mono lowercase">
      <div className="grid aspect-[2.5] w-full grid-flow-row-dense grid-cols-15 grid-rows-15 sm:w-148 md:w-180 lg:w-244 xl:w-280">
        <div className="col-span-12 col-start-4 row-span-12 border border-fore-dark">
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-xl text-fore-dark">Chart here</p>
          </div>
        </div>

        <div className="col-span-3 row-span-4 border border-fore-dark">
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-xl text-fore-dark">Stats here</p>
          </div>
        </div>

        <div className="col-span-3 row-span-4 border border-fore-dark"></div>

        <div className="col-span-3 row-span-4 border border-fore-dark"></div>

        <div className="col-span-3 row-span-3 border border-fore-dark"></div>

        <div className="col-span-3 row-span-3 border border-fore-dark"></div>

        <div className="col-span-3 row-span-3 border border-fore-dark"></div>

        <div className="col-span-3 row-span-3 border border-fore-dark"></div>

        <div className="col-span-3 row-span-3 border border-fore-dark"></div>
      </div>

      <button className="group cursor-pointer text-xl text-fore-dark lowercase hover:text-fore-light">
        <span>&gt;</span>
        <span className="mx-2 px-2 group-hover:mx-0 group-hover:underline group-active:px-1">Roll</span>
        <span>&lt;</span>
      </button>
    </main>
  );
}
