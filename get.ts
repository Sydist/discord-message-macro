const decoder = new TextDecoder();
const GET_REQUEST: RequestInit = {
    method: "GET", 
    headers: {
        "authorization": Deno.env.get("DISCORD_USER_TOKEN") as string,
    }, 
}

const getMessage = async (CHANNEL_ID: string, BEFORE: string) => {
    const response = await fetch(`https://discord.com/api/v9/channels/${CHANNEL_ID}/messages?limit=1&before=${BEFORE}`, GET_REQUEST)
    const value = (await response.body?.getReader().read())?.value;
    return JSON.parse(decoder.decode(value))[0];
}
 
export const getMessages = async (CHANNEL_ID: string) => {
    const FIRST = JSON.parse(decoder.decode((await (await fetch(`https://discord.com/api/v9/channels/${CHANNEL_ID}/messages?limit=1`, GET_REQUEST)).body?.getReader().read())?.value))[0]
    let id = FIRST.id;

    console.log({
        author: FIRST.author.username,
        content: FIRST.content,
        embed: FIRST.attachments[0]?.url
    });

    while (true) {
        const MESSAGE = await getMessage(CHANNEL_ID, id);
        id = MESSAGE.id;

        console.log({
            author: MESSAGE.author.username,
            content: MESSAGE.content,
            embed: MESSAGE.attachments[0]?.url
        });
    }
}
