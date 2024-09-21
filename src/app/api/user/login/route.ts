import { NextRequest, NextResponse } from "next/server";
import database from "../../database";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "@/utils/env";

const loginSchema = z.object({
  username: z.string(),
  password: z.string()
});

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const userLogin = loginSchema.parse(data);

    const user = await database.user.findFirst({
      where: {
        username: userLogin.username
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const checkPassword = bcrypt.compareSync(userLogin.password, user.password);

    if (!checkPassword) {
      return NextResponse.json(
        { message: "Invalid login" },
        { status: 400 }
      );
    }

    const userToResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
      expiresIn: "1d"
    });

    return NextResponse.json(
      { token: token, user: userToResponse },
      { status: 200 }
    );
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", data: error.errors },
        { status: 400 }
      );
    }
  }
}
