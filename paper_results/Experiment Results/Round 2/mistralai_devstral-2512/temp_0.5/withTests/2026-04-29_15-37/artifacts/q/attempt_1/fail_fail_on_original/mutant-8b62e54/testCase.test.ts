import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any rejection behavior", () => {
  it("should reject with a proper error message when all promises are rejected", async () => {
    const deferreds = [Q.defer(), Q.defer()];
    const promises = [deferreds[0].promise, deferreds[1].promise];
    const error = new Error("Test error");

    // Reject all promises
    deferreds[0].reject(error);
    deferreds[1].reject(error);

    try {
      await Q.any(promises);
      fail("Expected promise to reject");
    } catch (e) {
      expect(e.message).toContain("Q can't get fulfillment value from any promise, all promises were rejected");
      expect(e.message).toContain("Last error message: " + error.message);
    }
  });
});