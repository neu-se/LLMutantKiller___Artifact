import { any } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any function", () => {
  it("should resolve when at least one promise is fulfilled", async () => {
    const promises = [
      Promise.reject(new Error("Error 1")),
      Promise.resolve("Success"),
      Promise.reject(new Error("Error 2"))
    ];
    await expect(any(promises)).resolves.toBe("Success");
  });
});