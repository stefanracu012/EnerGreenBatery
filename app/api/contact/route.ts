import { NextRequest } from "next/server";
import { sendTelegram } from "@/lib/telegram";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, service, package: pkg, message } = body;

    if (!name || !phone || !message) {
      return Response.json(
        { error: "Toate câmpurile sunt obligatorii." },
        { status: 400 }
      );
    }

    // Build Telegram message
    const lines = [
      "🔔 <b>Cerere nouă de ofertă</b>",
      "",
      `👤 <b>Nume:</b> ${name}`,
      `📞 <b>Telefon:</b> ${phone}`,
    ];

    if (service) {
      lines.push(`⚡ <b>Serviciu:</b> ${service}`);
    }
    if (pkg) {
      lines.push(`📦 <b>Pachet:</b> ${pkg}`);
    }

    lines.push("", `💬 <b>Mesaj:</b>\n${message}`);
    lines.push("", `🕐 ${new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" })}`);

    const sent = await sendTelegram(lines.join("\n"));

    if (!sent) {
      console.error("Failed to send Telegram notification");
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "A apărut o eroare la trimiterea mesajului." },
      { status: 500 }
    );
  }
}
