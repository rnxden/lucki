export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center px-4 py-2 font-mono lowercase">
      <p className="text-lg text-fore-dark">
        {"Built by "}
        <a
          className="text-accent-dark hover:text-accent-light"
          href="https://rnx.sh"
          target="_blank"
          rel="noopener noreferrer"
        >
          rnxden
        </a>

        {" / Source on "}
        <a
          className="text-accent-dark hover:text-accent-light"
          href="https://github.com/rnxden/lucki"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>

      <p className="text-lg text-fore-dark">
        {"Copyright 2025 / "}
        <a
          className="text-accent-dark hover:text-accent-light"
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
