import { any } from "./q.js";

describe("Q.any mutation test", () => {
  it("should resolve when at least one promise is fulfilled", async () => {
    const promises = [
      Promise.reject(new Error("first")),
      Promise.reject(new Error("second")),
      Promise.resolve("success")
    ];

    const result = await any(promises);
    expect(result).toBe("success");
  });
});