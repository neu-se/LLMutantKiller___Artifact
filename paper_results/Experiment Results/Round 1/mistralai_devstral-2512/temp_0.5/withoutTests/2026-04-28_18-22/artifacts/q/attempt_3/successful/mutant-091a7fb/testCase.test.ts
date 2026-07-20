import { any } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any mutation test", () => {
  it("should reject when all promises are rejected", async () => {
    const promises = [
      Promise.reject(new Error("first")),
      Promise.reject(new Error("second")),
      Promise.reject(new Error("third"))
    ];

    await expect(any(promises)).rejects.toThrow();
  });
});