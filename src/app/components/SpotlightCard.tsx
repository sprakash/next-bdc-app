import Image from "next/image";

export type SpotlightMember = {
  id: string;
  name: string;
  title?: string;
  imageUrl: string;
  bio?: string;
};

export function SpotlightCard({
  member,
  isActive,
}: {
  member: SpotlightMember;
  isActive?: boolean;
}) {
  return (
    <div
      className={`
        relative flex-shrink-0 w-64 sm:w-72 lg:w-80
        transition-transform duration-300
        ${isActive ? "scale-105" : "scale-95 opacity-75"}
      `}
    >
      <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg">
        <Image
          src={member.imageUrl}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-2 text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          {member.name}
        </h3>
        {member.title && (
          <p className="text-sm text-gray-600">{member.title}</p>
        )}
      </div>
    </div>
  );
}

