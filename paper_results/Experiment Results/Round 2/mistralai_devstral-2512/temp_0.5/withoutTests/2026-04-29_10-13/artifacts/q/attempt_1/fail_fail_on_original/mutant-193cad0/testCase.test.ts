import { Q } from "./q.js";

describe("Q.any", () => {
  it("should reject with an error when all promises are rejected", async () => {
    const promises = [
      Q.reject(new Error("First error")),
      Q.reject(new Error("Second error")),
      Q.reject(new Error("Third error"))
    ];

    await expect(Q.any(promises)).rejects.toThrow("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: Third error");
  });
});