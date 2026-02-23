"use client";

type Member = {
  id: string;
  name: string;
};

const members: Member[] = [
  { id: "1", name: "MARCIA SMITH" },
  { id: "2", name: "SABRINA S. GORDAN" },
  { id: "3", name: "JENNIFER MACARTHUR" },
  { id: "4", name: "Michèle Stephenson" },
  { id: "5", name: "JOE BREWSTER" },
  { id: "6", name: "ANGELA TUCKER" },
];

export default function MemberSpotlight() {
  return (
    <section className="py-8 pb-30 shadow-[gainsboro_0px_0px_20px_1px]">

      <h3 className="text-neutral-500 text-3xl text-center mb-2 mt-10 uppercase tracking-wide">
        MEMBER SPOTLIGHT
      </h3>

      <div className="px-6 md:px-20 lg:px-40">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8">
          {members.map((member) => (
            <div
              key={member.id}
              onClick={() => console.log(member.name)}
              className="
                group
                bg-neutral-400
                h-60
                flex items-center justify-center
                border-t-8 border-black
                cursor-pointer
                shadow-md
                transition-all duration-300
                hover:bg-neutral-500
                hover:scale-95
                lg:h-100
              "
            >
              <h4
                className="
                  text-white
                  font-bold
                  uppercase
                  tracking-wide
                  transition-all duration-300
                  group-hover:text-xl
                "
              >
                {member.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
