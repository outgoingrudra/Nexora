import "dotenv/config";

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: "Rudra Verma",
        email: "rudra@example.com",
        password: "hashed_password",
        city: "Kolkata",
        skills: ["React", "Node.js", "PostgreSQL"],
      },
      {
        name: "Aman Sharma",
        email: "aman@example.com",
        password: "hashed_password",
        city: "Delhi",
        skills: ["Java", "Spring Boot"],
      },
    ],
  });

  console.log("Seeded successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });