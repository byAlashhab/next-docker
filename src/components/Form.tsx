"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ComponentProps, useState } from "react";

function Form({
  onSubmit,
  deleteAll,
}: {
  onSubmit: (title: string) => Promise<void>;
  deleteAll: () => Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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
        onClick={async () => {
          setAddLoading(true);
          await onSubmit(title);
          setTitle("");
          setAddLoading(false);
        }}
        disabled={addLoading}
      >
        {addLoading ? "..." : "Add"}
      </Button>

      <Button
        variant={"destructive"}
        onClick={async () => {
          setDeleteLoading(true);
          await deleteAll();
          setDeleteLoading(false);
        }}
        disabled={deleteLoading}
      >
        {deleteLoading ? "..." : "Delete All"}
      </Button>
    </div>
  );
}

type MarkDoneProps = ComponentProps<"button"> & {
  id: string;
  markDone: (id: string) => Promise<void>;
};

function MarkDone({ id, markDone, disabled }: MarkDoneProps) {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      disabled={disabled || loading}
      className="w-fit"
      onClick={async () => {
        setLoading(true);
        await markDone(id);
        setLoading(false);
      }}
    >
      {loading ? "..." : <>Done {disabled ? "" : "?"}</>}
    </Button>
  );
}

export { Form, MarkDone };
