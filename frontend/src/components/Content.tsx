export default function Content() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 font-mono lowercase">
      <div className="grid aspect-[2.5] w-full grid-flow-row-dense grid-cols-15 grid-rows-15 gap-1 sm:w-148 md:w-180 lg:w-244 xl:w-280">
        <div className="col-span-12 col-start-4 row-span-12">
          <div className="flex h-full w-full items-center justify-center border border-dashed border-fore-dark">
            <p className="text-xl text-fore-dark">Chart here</p>
          </div>
        </div>

        <div className="col-span-3 row-span-12">
          <div className="mb-2">
            <h3 className="text-xl text-fore-dark">You rolled a</h3>
            <p className="text-6xl text-accent-light">500</p>
          </div>

          <div>
            <h3 className="text-xl text-fore-dark">Z-Score of</h3>
            <p className="text-4xl text-accent-light">0.00</p>
          </div>

          <div>
            <h3 className="text-xl text-fore-dark">Better than</h3>
            <p className="text-4xl text-accent-light">
              50.00%
              <span className="text-xl"> of ppl</span>
            </p>
          </div>

          <div>
            <h3 className="text-xl text-fore-dark">Worse than</h3>
            <p className="text-4xl text-accent-light">
              50.00%
              <span className="text-xl"> of ppl</span>
            </p>
          </div>
        </div>

        <div className="col-span-3 row-span-3">
          <h3 className="text-xl text-fore-dark">Your average roll</h3>
          <p className="text-3xl text-accent-light">500</p>
        </div>

        <div className="col-span-3 row-span-3">
          <h3 className="text-xl text-fore-dark">Your median roll</h3>
          <p className="text-3xl text-accent-light">500</p>
        </div>

        <div className="col-span-3 row-span-3">
          <h3 className="text-xl text-fore-dark">Your most rolled</h3>
          <p className="text-3xl text-accent-light">500</p>
        </div>

        <div className="col-span-3 row-span-3">
          <h3 className="text-xl text-fore-dark">Your highest roll</h3>
          <p className="text-3xl text-accent-light">500</p>
        </div>

        <div className="col-span-3 row-span-3">
          <h3 className="text-xl text-fore-dark">Your lowest roll</h3>
          <p className="text-3xl text-accent-light">500</p>
        </div>
      </div>

      <button className="group cursor-pointer text-xl text-fore-dark lowercase hover:text-fore-light">
        <span>&gt;</span>
        <span className="mx-2 px-2 group-hover:mx-0 group-hover:underline group-active:px-1">Roll</span>
        <span>&lt;</span>
      </button>
    </main>
  );
}
