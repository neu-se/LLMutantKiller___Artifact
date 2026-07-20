import { any } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any mutation test", () => {
  it("should reject with the correct error message when all promises are rejected", async () => {
    const error = new Error("test error");
    const promises = [
      Promise.reject(error),
      Promise.reject(new Error("another error"))
    ];

    await expect(any(promises)).rejects.toThrow("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: another error");
  });
});