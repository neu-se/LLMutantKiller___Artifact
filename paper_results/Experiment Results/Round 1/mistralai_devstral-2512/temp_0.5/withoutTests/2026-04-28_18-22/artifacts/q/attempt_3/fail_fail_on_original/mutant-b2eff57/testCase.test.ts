import { any } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any mutation test", () => {
  it("should handle null/undefined errors correctly when all promises are rejected", async () => {
    const promises = [
      Promise.reject(null),
      Promise.reject(undefined),
      Promise.reject("error message")
    ];

    try {
      await any(promises);
      fail("Expected promise to reject");
    } catch (error: any) {
      expect(error).toBeTruthy();
      expect(error.message).toContain("Q can't get fulfillment value from any promise");
      expect(error.message).toContain("error message");
    }
  });
});