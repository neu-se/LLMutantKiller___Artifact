import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any rejection behavior", () => {
  it("should reject with a proper error message when all promises are rejected", async () => {
    const deferreds = [Q.defer(), Q.defer()];
    const promises = [deferreds[0].promise, deferreds[1].promise];
    const error = new Error("Test error");

    deferreds[0].reject(error);
    deferreds[1].reject(error);

    try {
      await Q.any(promises);
      throw new Error("Expected promise to reject");
    } catch (e: any) {
      expect(e.message).toContain("Q can't get fulfillment value from any promise, all promises were rejected. Last error message:");
    }
  });
});