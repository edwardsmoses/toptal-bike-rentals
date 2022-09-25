import Link from "next/link";

type Props = {
  title: string;
  message: string;
  link?: string;
  linkText?: string;
};
export const EmptyState = ({ title, message, link, linkText }: Props) => {
  return (
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold">{title}</h2>

      <p className="mx-auto mt-3 text-gray-500">{message}</p>

      {link ? (
        <Link href={link}>
          <a className="flex items-center justify-between px-5 py-3 mt-8 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 group">
            <span className="text-lg font-medium group-hover:text-white">{linkText}</span>

            <span className="flex-shrink-0 p-2 ml-4 bg-white border border-blue-600 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
        </Link>
      ) : null}
    </div>
  );
};
