import { any } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any mutation test", () => {
  it("should reject with correct message when all promises reject", async () => {
    const promises = [
      Promise.reject(new Error("first")),
      Promise.reject(new Error("second")),
      Promise.reject(new Error("third"))
    ];
    try {
      await any(promises);
      fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Q can't get fulfillment value from any promise");
    }
  });
});