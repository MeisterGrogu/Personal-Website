import { useState } from "react";
import { badges } from "../../content/badges";

const Über = ({ isMaximized }) => {
  const [seeMore, setSeeMore] = useState(false);
  return (
    <div
      className={`flex flex-col gap-[35px] px-5 sm:px-[70px] py-[30px]  h-full overflow-y-auto ${
        isMaximized ? "pb-[100px] sm:pb-[50px]" : ""
      }`}
    >
      <div
        className={`flex sm:flex-row flex-col sm:gap-10 items-center sm:items-start justify-start`}
      >
        <img
          src="/assets/profilePic.png"
          alt="profilePhoto"
          className="border-s-[2px] border-s-[#fafafa] border-t-[2px] border-t-[#fafafa] border-black border-[1px] w-[220px]"
        />
        <div className=" flex flex-col sm:items-start items-center  gap-1 mt-4 sm:mt-14">
          <h2
            className={` font-extrabold ${
              isMaximized ? " text-[40px]" : "text-[30px]"
            }`}
          >
            Leopold P
          </h2>
          <h2
            className={` font-extrabold ${
              isMaximized ? " text-[25px]" : "text-[16px]"
            }`}
          >
            All Round Entwickler
          </h2>
          <h4
            className={` text-red-700 ${
              isMaximized ? " text-[20px]" : "text-[16px]"
            }`}
          >
            📍 Neuenkirchen(bei Neubrandenburg), Deutschland
          </h4>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
        {badges.map((url, i) => {
          return <img src={url} alt="badge" key={i} />;
        })}
      </div>
      <div>
        <h4 className=" font-bold pb-3">Über mich</h4>
        <p className=" before:ps-7">
        Hallo, ich bin Leopold, ein leidenschaftlicher Backend- und Allround-Entwickler.
        Ich liebe Programmieren und Problemlösen und liebe die Herausforderungen, die die
        Softwareentwicklung mit sich bringt. Mit Kenntnissen in der Backend- und etwas 
        Frontend-Entwicklung genieße ich es, nahtlose und dynamische Erlebnisse für meine
        Familie und Freunde zu schaffen.
          <span
            className={`text-blue-500 ps-2 cursor-pointer ${
              seeMore ? "hidden" : ""
            }`}
            onClick={() => setSeeMore((prev) => !prev)}
          >
            mehr lesen...
          </span>
        </p>
        {seeMore && (
          <>
            <p className=" pt-6">
            Meine Reise in die Welt des Programmierens begann in der Schule im Informatikunterricht.
            Dort kam ich zum ersten Mal richtig mit dem Programmieren in Berührung und entdeckte
            dessen kreatives Potenzial. Die logische Struktur und die Fähigkeit, aus dem Nichts etwas
            zu erschaffen, faszinierten mich. Mit der Zeit begann ich, Programmieren nicht nur als
            technische Fähigkeit zu betrachten, sondern als mächtiges Werkzeug, um Ideen zum Leben zu
            erwecken und echte Wirkung zu erzielen.
            </p>
            <p className=" pt-6">
              Und schließlich bin ich ein großer Fan der Zusammenarbeit mit Gleichgesinnten, da die
              Zusammenarbeit mein kritisches Denken fördert und mir hilft, sowohl persönlich als auch
              fachlich zu wachsen.
              <span
                className={`text-blue-500 ps-1 cursor-pointer ${
                  !seeMore ? "hidden" : ""
                }`}
                onClick={() => setSeeMore((prev) => !prev)}
              >
                (verstecken)
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Über;
