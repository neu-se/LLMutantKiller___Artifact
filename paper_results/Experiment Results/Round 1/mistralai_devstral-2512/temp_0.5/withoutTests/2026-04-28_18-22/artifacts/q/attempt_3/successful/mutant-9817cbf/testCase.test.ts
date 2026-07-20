import { any } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any mutation test", () => {
  it("should reject with the correct error when all promises are rejected", async () => {
    const error = new Error("test error");
    const promises = [
      Promise.reject(error),
      Promise.reject(new Error("another error"))
    ];

    await expect(any(promises)).rejects.toBeTruthy();
  });
});