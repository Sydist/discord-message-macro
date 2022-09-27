const decoder = new TextDecoder();
const GET_REQUEST: RequestInit = {
    method: "GET", 
    headers: {
        "authorization": Deno.env.get("DISCORD_TOKEN") as string,
    }, 
}

export const getMessages = async (CHANNEL_ID: string, LIMIT = Infinity, AMOUNT = 100) =>
{
    let lastMessageId = 0;
    let currentlyPrinted = "";
    let printedCount = 0;
    let running = true;

    while (running)
    {
        const url = new URL(`https://discord.com/api/v9/channels/${CHANNEL_ID}/messages`);
        url.searchParams.append("limit", AMOUNT.toString());
        if (lastMessageId)
            url.searchParams.append("before", lastMessageId.toString());
        
        const response = await fetch(url, GET_REQUEST);
        const reader = (response.body?.getReader()) as ReadableStreamReader;
    
        let result = "";
        while (true)
        {
            const { value, done } = await reader.read();
            if (done) 
                break;
    
            const chunk = decoder.decode(value);
            result += chunk;
        }
        
        const messages = JSON.parse(result);
        lastMessageId = messages[messages.length - 1].id;
        
        // deno-lint-ignore no-explicit-any
        messages.every((message: Record<string, any>) => 
        {
            currentlyPrinted += `${message.author.username}: ${message.content}\n`;

            console.log(++printedCount);
            if (printedCount >= LIMIT)
            {
                Deno.writeTextFile("out.txt", currentlyPrinted);
                running = false;
                return false;
            }

            return true;
        });
    } 
}
