import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  id: number;
  name: string;
  imageIndex?: number;
  isLarge: boolean;
  className?: string;
}

export default function CategoryCard({
  id,
  name,
  className,
  isLarge,
}: CategoryCardProps) {
  return (
    <Link
      className={
        `relative overflow-hidden rounded group ${
          isLarge ? "col-span-2" : "col-span-1"
        } h-40` + (className ? ` ${className}` : "")
      }
      href={`/category/${id}`}
    >
      <Image
        fill
        alt={name}
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        src={`/shirt.png`}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-white text-lg font-bold uppercase">{name}</h3>
      </div>
    </Link>
  );
}
