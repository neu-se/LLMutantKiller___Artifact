import { any } from "./q.js";

describe("Q.any mutation test", () => {
  it("should resolve when any promise in the array resolves", async () => {
    const promises = [
      Promise.reject(new Error("error1")),
      Promise.reject(new Error("error2")),
      Promise.resolve("success")
    ];

    const result = await any(promises);
    expect(result).toBe("success");
  });
});