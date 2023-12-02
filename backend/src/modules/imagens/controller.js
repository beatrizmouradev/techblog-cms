import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "df5ikmjau",
  api_key: "894793169669483",
  api_secret: "s8Y-ZxGQwT35VlDYOO7rO37skus",
});

export class ImagensController {
  /** Create image.
   *
   * @param {import("express").Request<null, string, { base64: string, id: string }>} req
   * @param {import("express").Response} res
   */
  static uploadImageFromBase64 = async (
    { body: { base64, id } },
    res
  ) => {
    try {
      const { url } = await cloudinary.uploader.upload(base64, {
        public_id: id,
      });

      return res.status(201).send({ url });
    } catch (error) {
      console.error(error);
      return res.status(400).send("Error while uploading from base 64")
    }
  };
}
