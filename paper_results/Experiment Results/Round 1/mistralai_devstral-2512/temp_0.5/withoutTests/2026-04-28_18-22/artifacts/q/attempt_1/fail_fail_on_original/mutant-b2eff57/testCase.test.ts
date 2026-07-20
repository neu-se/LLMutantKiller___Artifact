import { any } from "./q.js";

describe("Q.any mutation test", () => {
  it("should reject with the last error when all promises are rejected", async () => {
    const error1 = new Error("First error");
    const error2 = new Error("Second error");
    const error3 = new Error("Third error");

    const promises = [
      Promise.reject(error1),
      Promise.reject(error2),
      Promise.reject(error3)
    ];

    try {
      await any(promises);
      fail("Expected promise to reject");
    } catch (error: any) {
      expect(error.message).toContain("Third error");
      expect(error.message).toContain("Q can't get fulfillment value from any promise");
    }
  });
});