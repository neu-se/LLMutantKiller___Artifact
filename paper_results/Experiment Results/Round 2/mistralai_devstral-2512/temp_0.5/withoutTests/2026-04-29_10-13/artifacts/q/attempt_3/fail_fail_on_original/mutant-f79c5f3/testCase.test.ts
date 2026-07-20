import { any } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any mutation test", () => {
  it("should handle multiple rejections correctly", async () => {
    const promises = [
      Promise.reject(new Error("first")),
      Promise.reject(new Error("second")),
      Promise.reject(new Error("third"))
    ];
    try {
      await any(promises);
      fail("Should have thrown an error");
    } catch (error) {
      expect(error.message).toBe("first");
    }
  });
});