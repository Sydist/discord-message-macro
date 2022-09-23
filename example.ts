import "https://deno.land/std@0.153.0/dotenv/load.ts";
import { getMessages } from "./get.ts";
import { postMessage } from "./post.ts";

const DM_ID = Deno.env.get("DM_ID") as string;

// postMessage(DM_ID, "Message")
getMessages(DM_ID)