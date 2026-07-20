import { any } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any mutation test", () => {
  it("should resolve with the first fulfilled promise", async () => {
    const promises = [
      Promise.reject(new Error("first")),
      Promise.resolve("success"),
      Promise.reject(new Error("second"))
    ];
    const result = await any(promises);
    expect(result).toBe("success");
  });
});