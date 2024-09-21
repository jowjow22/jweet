import { NextRequest, NextResponse } from "next/server";
import database from "../database";
import { userSchema, baseUserCreationSchema } from "@/models/User";
import { z } from "zod";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  const newUser = await req.json();

  try {
    const user = baseUserCreationSchema.parse(newUser);
    const userData = {
      ...user,
      posts: { create: [] },
      likes: { create: [] },
    };
    const createdUser = userSchema.parse(
      await database.user.create({ data: userData })
    );

    return NextResponse.json(
      { message: "User created", data: createdUser },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", data: error.errors },
        { status: 400 }
      );
    }
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const field = error.meta && Array.isArray(error.meta.target) ? error.meta.target[0] : "User";
      return NextResponse.json(
        { message: `${field} already exists` },
        { status: 400 }
      );
    }
  }
}

export async function GET() {
  const users = await database.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      avatar: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  

  return NextResponse.json(users, { status: 200 });
}
