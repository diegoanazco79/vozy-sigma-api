import { Request, Response } from "express";

const getEmbedUrl = async (req: Request, res: Response) => {
  try {
    const embedUrl = "url";
    res.send({ url: embedUrl });
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

export { getEmbedUrl };
