const BOT_TOKEN = "8711033825:AAEIjoj5vNGjjuDGC1eYpq8pJYzUE0rCfQQ";
const CHAT_ID = "-5076190951";

export async function sendTelegram(text: string): Promise<boolean> {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("Telegram send error:", err);
    return false;
  }
}
