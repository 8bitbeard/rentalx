import { NextFunction, Request, Response } from "express";
import Redis from "ioredis";
import { RateLimiterRedis } from "rate-limiter-flexible";

import { AppError } from "@shared/errors/AppError";

const redisClient = new Redis(
  Number(process.env.REDIS_PORT),
  process.env.REDIS_HOST
);

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiter",
  points: 5,
  duration: 5,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (err) {
    throw new AppError("Too many requests", 429);
  }
}
