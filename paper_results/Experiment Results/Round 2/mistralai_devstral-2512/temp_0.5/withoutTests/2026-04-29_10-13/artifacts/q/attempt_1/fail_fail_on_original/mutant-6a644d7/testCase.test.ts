import { Q } from "./q.js";

describe("Q.race", () => {
  it("should resolve when the first promise in the array resolves", async () => {
    const fastPromise = Q.resolve("fast");
    const slowPromise = new Promise((resolve) => setTimeout(() => resolve("slow"), 100));
    const result = await Q.race([slowPromise, fastPromise]);
    expect(result).toBe("fast");
  });
});