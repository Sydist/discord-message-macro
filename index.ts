import "https://deno.land/std@0.153.0/dotenv/load.ts";
import { getMessages } from "./get.ts";
import { postMessage } from "./post.ts";

const GET = parseInt(Deno.env.get("GET") as string);
const POST = parseInt(Deno.env.get("POST") as string);

const DM_ID = Deno.env.get("DM_ID") as string;

if (GET)
{
    const LIMIT = parseInt(Deno.env.get("GET_LIMIT") as string);
    getMessages(DM_ID, LIMIT);
}

if (POST)
{
    const MESSAGE = Deno.env.get("POST_MESSAGE") as string;
    postMessage(DM_ID, MESSAGE);
}
