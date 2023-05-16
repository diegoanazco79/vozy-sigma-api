"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmbedUrl = void 0;
const crypto_1 = __importDefault(require("crypto"));
const getEmbedUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { embed_url, client_id, external_user_id, email, external_user_team, secret } = _a, otherParams = __rest(_a, ["embed_url", "client_id", "external_user_id", "email", "external_user_team", "secret"]);
    try {
        const nonce = crypto_1.default.randomUUID();
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
        const SIGNATURE = crypto_1.default
            .createHmac("sha256", Buffer.from(secret, "utf8"))
            .update(Buffer.from(URL_WITH_SEARCH_PARAMS, "utf8"))
            .digest("hex");
        const URL_TO_SEND = `${URL_WITH_SEARCH_PARAMS}&:signature=${SIGNATURE}`;
        res.send({ url: URL_TO_SEND });
    }
    catch (error) {
        res.status(500);
        res.send(error);
    }
});
exports.getEmbedUrl = getEmbedUrl;
