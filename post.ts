const REQUEST: RequestInit = {
    method: "POST", 
    headers: {
        "authorization": Deno.env.get("DISCORD_TOKEN") as string,
    }, 
}

export const postMessage = async (CHANNEL_ID: string, MESSAGE: string) => {
    REQUEST.body = JSON.stringify({content: MESSAGE});
    return await fetch(`https://discord.com/api/v9/channels/${CHANNEL_ID}/messages`, REQUEST);
}