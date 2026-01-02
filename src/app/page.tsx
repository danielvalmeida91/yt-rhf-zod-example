"use client";

import { useState } from "react";

export default function Home() {
  const [formError, setFormError] = useState({
    nome: "",
    email: "",
    cidade: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      cidade: formData.get("cidade"),
    };

    const errors = {
      nome: "",
      email: "",
      cidade: "",
    };

    if (!data.nome || (data.nome as string).length < 3) {
      errors.nome = "O nome deve ter pelo menos 3 caracteres.";
    }
    if (!data.email || !(data.email as string).includes("@")) {
      errors.email = "Email inválido.";
    }
    if (!data.cidade) {
      errors.cidade = "A cidade é obrigatória.";
    }

    const hasErrors = Object.values(errors).some((error) => error !== "");
    setFormError(errors);

    if (!hasErrors) {
      setFormError({ nome: "", email: "", cidade: "" });
    }

    console.log(data);
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold text-green-300">
        Exemplo de formulário comum
      </h1>
      <form
        className="flex flex-col gap-5 mt-10"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-col relative">
          <label htmlFor="nome">Nome: </label>
          <input
            type="text"
            name="nome"
            id="nome"
            className="border border-solid border-gray-50 rounded-sm py-2 px-3"
          />
          <p className="text-[12px] text-red-500">{formError.nome}</p>
        </div>
        <div className="flex flex-col relative">
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            id="email"
            className="border border-solid border-gray-50 rounded-sm py-2 px-3"
          />
          <p className="text-[12px] text-red-500">{formError.email}</p>
        </div>
        <div className="flex flex-col relative">
          <label htmlFor="cidade">Cidade: </label>
          <input
            type="text"
            name="cidade"
            id="cidade"
            className="border border-solid border-gray-50 rounded-sm py-2 px-3"
          />
          <p className="text-[12px] text-red-500">{formError.cidade}</p>
        </div>

        <button type="submit" className="p-2 bg-green-700 rounded-md w-full">
          Enviar
        </button>
      </form>
    </div>
  );
}
