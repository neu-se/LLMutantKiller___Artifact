import { Q } from "./q";

describe("Q.any rejection behavior", () => {
  it("should reject with an error when all promises are rejected", async () => {
    const promises = [
      Q.reject(new Error("First error")),
      Q.reject(new Error("Second error")),
      Q.reject(new Error("Third error"))
    ];

    await expect(Q.any(promises)).rejects.toBeDefined();
  });
});