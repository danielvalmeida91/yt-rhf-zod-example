"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().min(1, "E-mail é obrigatório.").email("Email inválido"),
  city: z.string().min(1, "A cidade é obrigatória"),
});

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      city: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <div className="flex flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-green-300">
        Exemplo de formulário com React Hook Form e Zod
      </h1>
      <form
        className="flex flex-col gap-6 mt-10 w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-3 relative">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            className="p-2 rounded-sm border boder-solid border-gray-50"
            {...register("name")}
          />
          <p className="absolute -bottom-5 left-0 text-xs text-red-500">
            {errors.name?.message}
          </p>
        </div>
        <div className="flex flex-col gap-3 relative">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            {...register("email")}
            className="p-2 rounded-sm border boder-solid border-gray-50"
          ></input>
          <p className="absolute -bottom-5 left-0 text-xs text-red-500">
            {errors.email?.message}
          </p>
        </div>
        <div className="flex flex-col gap-3 relative">
          <label htmlFor="city">Cidade:</label>
          <input
            type="text"
            {...register("city")}
            className="p-2 rounded-sm border boder-solid border-gray-50"
          />
          <p className="absolute -bottom-5 left-0 text-xs text-red-500">
            {errors.city?.message}
          </p>
        </div>
        <button
          type="submit"
          className="p-2 rounded-sm bg-green-700 text-white font-bold"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
