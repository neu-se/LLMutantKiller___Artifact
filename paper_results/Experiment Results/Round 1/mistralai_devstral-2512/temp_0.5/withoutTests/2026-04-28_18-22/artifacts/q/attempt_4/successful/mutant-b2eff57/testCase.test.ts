import { any } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any mutation test", () => {
  it("should handle falsy error values correctly when all promises are rejected", async () => {
    const promises = [
      Promise.reject(0),
      Promise.reject(false),
      Promise.reject("")
    ];

    try {
      await any(promises);
      fail("Expected promise to reject");
    } catch (error: any) {
      expect(error).toBeTruthy();
      expect(typeof error).toBe("object");
      expect(error.message).toContain("Q can't get fulfillment value from any promise");
    }
  }, 10000);
});