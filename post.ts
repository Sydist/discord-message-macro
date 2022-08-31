export const postMessage = async (CHANNEL_ID: string, MESSAGE: string) => {
    const POST_REQUEST: RequestInit = {
        method: "POST", 
        headers: {
            "authorization": Deno.env.get("DISCORD_USER_TOKEN") as string,
            "content-type": "application/json",
        }, 
        body: JSON.stringify({
            "content": MESSAGE
        })
    }

    await fetch(`https://discord.com/api/v9/channels/${CHANNEL_ID}/messages`, POST_REQUEST);
}