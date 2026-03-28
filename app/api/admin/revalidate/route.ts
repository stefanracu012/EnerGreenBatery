import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * POST /api/admin/revalidate
 * Body: { "paths": ["/", "/proiecte/casa-modesta", ...] }
 * Revalidates the given paths so stale ISR caches are purged.
 */
export async function POST(request: NextRequest) {
  try {
    // Check admin cookie
    const token = request.cookies.get("admin-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { paths } = await request.json();

    if (!Array.isArray(paths) || paths.length === 0) {
      // Default: revalidate everything important
      revalidatePath("/");
      return NextResponse.json({ revalidated: ["/"] });
    }

    for (const p of paths) {
      revalidatePath(p);
    }

    return NextResponse.json({ revalidated: paths });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
