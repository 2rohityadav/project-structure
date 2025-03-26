import { FC } from "react";
import { Github } from "lucide-react";

interface GitHubLinkProps {
  url: string;
  size?: number;
  className?: string;
  showText?: boolean;
}

export const GitHubLink: FC<GitHubLinkProps> = ({
  url,
  size = 20,
  className = "",
  showText = false,
}) => {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className={`inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors ${className}`}
      title='View on GitHub'
    >
      <Github size={size} />
      {showText && <span className='text-sm'>View on GitHub</span>}
    </a>
  );
};
