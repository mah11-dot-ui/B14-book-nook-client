import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/lib/auth";

export async function GET(request) {
    const handler = toNextJsHandler(getAuth());
    return handler.GET(request);
}

export async function POST(request) {
    const handler = toNextJsHandler(getAuth());
    return handler.POST(request);
}
