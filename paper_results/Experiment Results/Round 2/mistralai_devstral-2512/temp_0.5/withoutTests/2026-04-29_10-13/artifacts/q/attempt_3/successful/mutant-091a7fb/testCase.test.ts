import { any } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any mutation test", () => {
  it("should reject when all promises are rejected", async () => {
    const promises = [
      Promise.reject(new Error("error1")),
      Promise.reject(new Error("error2")),
      Promise.reject(new Error("error3"))
    ];

    await expect(any(promises)).rejects.toThrow();
  });
});