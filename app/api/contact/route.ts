import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone || !message) {
      return Response.json(
        { error: "Toate câmpurile sunt obligatorii." },
        { status: 400 }
      );
    }

    // TODO: Save to database with Prisma when MongoDB is connected
    // import { PrismaClient } from "@prisma/client";
    // const prisma = new PrismaClient();
    // await prisma.contactRequest.create({
    //   data: { name, phone, message },
    // });

    console.log("New contact request:", { name, phone, message });

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "A apărut o eroare la trimiterea mesajului." },
      { status: 500 }
    );
  }
}
