import { Fragment } from "react/jsx-runtime";
import { Card } from "../../ui/card";
import { XIcon } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Input } from "../../ui/input";
import { Field, FieldGroup, FieldLabel } from "../../ui/field";
import { Button } from "../../ui/button";
import { useLink } from "../../../provider/link-provider";

export function NewLinkPopup() {
  const { setShowNewLinkPopup, showNewLinkPopup } = useLink();
  const cardRef = useRef<HTMLDivElement>(null);
  const [subject, setSubject] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [link, setLink] = useState<string>("");

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

  function onClose() {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -10,
        opacity: 0,
        scale: 0.8,
        duration: 0.1,
        ease: "power2.in",
        onComplete: () => {
          setShowNewLinkPopup(false);
        },
      });
    }
  }

  async function handleSubmit() {
    onClose();
  }

  return (
    <Fragment>
      <div className="absolute  inset-0 top-0 left-0 w-full h-full flex flex-row items-center justify-between align-middlez-99">
        <div
          className="absolute inset-0 bg-black opacity-40 w-full h-full z-99 select-none"
          onMouseUp={() => onClose()}
        />
        <Card
          ref={cardRef}
          className="absolute max-h-140 overflow-y-auto left-1/2 transform -translate-x-1/2  p-6 w-96 select-none  z-100"
        >
          <h2 className="text-2xl font-semibold  flex flex-row justify-end">
            <XIcon className="cursor-pointer" onMouseUp={() => onClose()} />
          </h2>
          <hr />
          <FieldGroup className="flex flex-col gap-4">
            <Field>
              <FieldLabel htmlFor="input-subject">Enter Subject</FieldLabel>
              <Input
                id="input-subject"
                type="text"
                placeholder="Mathematics"
                onChange={(e) => setSubject(e.currentTarget.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="input-unit">Enter Unit</FieldLabel>
              <Input
                id="input-unit"
                type="text"
                placeholder="Unit 1"
                onChange={(e) => setUnit(e.currentTarget.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="input-link">Enter Link</FieldLabel>
              <Input
                id="input-link"
                type="text"
                placeholder="https://example.com"
                onChange={(e) => setLink(e.currentTarget.value)}
              />
            </Field>
          </FieldGroup>
          <Button
            className="!bg-chart-2  hover:!bg-chart-2/60 transition-all duration-400 cursor-pointer"
            variant={"outline"}
            onMouseUp={() => handleSubmit()}
          >
            Submit
          </Button>
        </Card>
      </div>
    </Fragment>
  );
}
