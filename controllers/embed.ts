import crypto from "crypto";
import { Request, Response } from "express";

const getEmbedUrl = async (req: Request, res: Response) => {

  const { embed_url, client_id, external_user_id, email, external_user_team, secret, ...otherParams  } = req.body;

  try {
    const nonce = crypto.randomUUID();
    const session_length = 3600;
    const mode = "userbacked";
    const time = `${Math.floor(new Date().getTime() / 1000)}`;

    let searchParams = `:nonce=${nonce}&:client_id=${client_id}&:session_length=${session_length}&:mode=${mode}&:time=${time}&:external_user_id=${external_user_id}&:email=${email}&:external_user_team=${external_user_team}`;

    for (const param in otherParams) {
      if (otherParams.hasOwnProperty(param)) {
        searchParams += `&:${param}=${otherParams[param]}`;
      }
    }

    const URL_WITH_SEARCH_PARAMS = `${embed_url}?${searchParams}`;
    const SIGNATURE = crypto
      .createHmac("sha256", Buffer.from(secret, "utf8"))
      .update(Buffer.from(URL_WITH_SEARCH_PARAMS, "utf8"))
      .digest("hex");

    const URL_TO_SEND = `${URL_WITH_SEARCH_PARAMS}&:signature=${SIGNATURE}`;

    res.send({ url: URL_TO_SEND });
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

export { getEmbedUrl };
