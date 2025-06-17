export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center px-4 py-2 font-mono lowercase">
      <p className="text-lg text-neutral-500">
        {"Built by "}
        <a
          className="text-green-800 hover:text-green-300"
          href="https://rnx.sh"
          target="_blank"
          rel="noopener noreferrer"
        >
          rnxden
        </a>

        {" / Source on "}
        <a
          className="text-green-800 hover:text-green-300"
          href="https://github.com/rnxden/lucki"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>

      <p className="text-lg text-neutral-500">
        {"Copyright 2025 / "}
        <a
          className="text-green-800 hover:text-green-300"
          href="https://github.com/rnxden/lucki/blob/master/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
        >
          License (MIT)
        </a>
      </p>
    </footer>
  );
}
