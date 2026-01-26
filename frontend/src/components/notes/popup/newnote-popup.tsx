import { Fragment } from "react/jsx-runtime";
import { Card } from "../../ui/card";
import { XIcon } from "lucide-react";
import { useNote } from "../../../provider/note-provider";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export function NewNotePopup() {
  const { setShowNewNotePopup } = useNote();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: -10, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scale: 1,
          ease: "power2.out",
        },
      );
    }
  }, []);

  return (
    <Fragment>
      <div className="absolute inset-0 top-0 left-0 w-full h-full flex flex-row items-center justify-between align-middlez-99">
        <div className="absolute inset-0 bg-black opacity-40 w-full h-full z-99" />
        <div className="absolute inset-0 w-full h-full z-100 top-0 left-0">
          <Card
            ref={cardRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 w-96"
          >
            <h2 className="text-2xl font-semibold mb-4 flex flex-row justify-end">
              <XIcon
                className="cursor-pointer"
                onMouseUp={() => setShowNewNotePopup(false)}
              />
            </h2>
          </Card>
        </div>
      </div>
    </Fragment>
  );
}
