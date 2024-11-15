import { Form, MarkDone } from "@/components/Form";
import db from "@/db/db";
import { revalidatePath } from "next/cache";
import { ABeeZee } from "next/font/google";
const abeezee = ABeeZee({ weight: "400", subsets: ["latin"] });

export default async function Home() {
  const todos = await db.todo.findMany({});

  async function addTodo(title: string) {
    "use server";

    if (!title) return;

    try {
      await db.todo.create({ data: { title } });
      revalidatePath("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteAll() {
    "use server";

    try {
      await db.todo.deleteMany({});
      revalidatePath("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function markDone(id: string) {
    "use server";
    try {
      await db.todo.update({ where: { id }, data: { done: true } });
      revalidatePath("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={abeezee.className}>
      <Form onSubmit={addTodo} deleteAll={deleteAll} />

      <div className="w-[400px] mx-auto mt-6 flex flex-col gap-4">
        {todos.map((todo) => (
          <div key={todo.id} className=" flex items-center justify-between">
            <p className={todo.done ? "line-through":""}>{todo.title}</p>
            <MarkDone disabled={todo.done} id={todo.id} markDone={markDone} />
          </div>
        ))}
      </div>
    </div>
  );
}
