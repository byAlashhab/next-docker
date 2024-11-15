"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ComponentProps, useState } from "react";

function Form({
  onSubmit,
  deleteAll,
}: {
  onSubmit: (title: string) => void;
  deleteAll: () => void;
}) {
  const [title, setTitle] = useState("");

  return (
    <div className="flex flex-col w-[400px] gap-2 mx-auto mt-4">
      <div className="flex items-center mx-auto gap-2">
        <h2>Todos with Docker</h2>
        <img src={"../docker.svg"} className="w-[40px]" alt="" />
      </div>

      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        onClick={() => {
          onSubmit(title);
          setTitle("");
        }}
      >
        Add
      </Button>
      <Button variant={"destructive"} onClick={() => deleteAll()}>
        Delete All
      </Button>
    </div>
  );
}

type MarkDoneProps = ComponentProps<"button"> & {
  id: string;
  markDone: (id: string) => void;
};

function MarkDone({ id, markDone, disabled }: MarkDoneProps) {
  return (
    <Button disabled={disabled} className="w-fit" onClick={() => markDone(id)}>
      Done {disabled ? "" : "?"}
    </Button>
  );
}

export { Form, MarkDone };
