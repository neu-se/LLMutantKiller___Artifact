import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any rejection behavior", () => {
  it("should reject with an error message when all promises are rejected", async () => {
    const p1 = Q.reject(new Error("first error"));
    const p2 = Q.reject(new Error("second error"));
    const p3 = Q.reject(new Error("third error"));

    let rejectionError: Error | null = null;

    try {
      await Q.any([p1, p2, p3]);
    } catch (err) {
      rejectionError = err as Error;
    }

    expect(rejectionError).not.toBeNull();
    expect(rejectionError!.message).toContain("Q can't get fulfillment value from any promise");
  });
});