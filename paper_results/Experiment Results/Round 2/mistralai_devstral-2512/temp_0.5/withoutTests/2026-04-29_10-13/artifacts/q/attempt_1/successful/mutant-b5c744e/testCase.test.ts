import { any } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any function", () => {
  it("should resolve with the first fulfilled promise value", async () => {
    const promises = [
      Promise.reject(new Error("First error")),
      Promise.resolve("success"),
      Promise.reject(new Error("Second error"))
    ];
    const result = await any(promises);
    expect(result).toBe("success");
  });
});