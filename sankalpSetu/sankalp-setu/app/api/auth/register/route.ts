import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const res = await fetch("http://127.0.0.1:8000/api/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: data.phone,
      password: data.password,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email || "",
    }),
  });
  const result = await res.json();
  return new Response(JSON.stringify(result), { status: res.status });
} 