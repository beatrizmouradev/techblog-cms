export class ImageAPI {
  static upload = async (
    /** @type {{ base64: string, id: string }} */ { base64, id },
  ) => {
    const response = await fetch("http://localhost:3001/imagens/", {
      method: "POST",
      body: JSON.stringify({ base64, id }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Erro ao salvar imagem");

    const { url } = await response.json();

    return url;
  };
}
