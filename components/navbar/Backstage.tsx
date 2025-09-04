import Link from 'next/link';
import Image from 'next/image';

interface BackstageProps {
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  isActive?: boolean;
}

export const Backstage: React.FC<BackstageProps> = ({
  href,
  src,
  alt,
  width,
  height,
  isActive = false
}) => {
  return (
    <Link 
      href={href} 
      className={`transition-opacity duration-300 ${isActive ? 'opacity-50' : 'opacity-100'}`}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className="mx-auto"
      />
    </Link>
  );
};