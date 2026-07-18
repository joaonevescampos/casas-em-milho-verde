import empty from "../../assets/empty.png";

export function EmptyProperties() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-8 py-16 text-center">
      <div className="mb-6 flex h-24 w-32 items-center justify-center rounded-full bg-white shadow-sm">
        <img src={empty} alt="empty" />
      </div>

      <h2 className="font-semibold text-gray-800">
        Nenhum imóvel cadastrado
      </h2>

      <p className="mt-2 max-w-md text-xs text-gray-500">
        Você ainda não cadastrou nenhum imóvel. Clique no botão "adicionar" para
        criar seu primeiro imóvel!
      </p>
    </div>
  );
}
