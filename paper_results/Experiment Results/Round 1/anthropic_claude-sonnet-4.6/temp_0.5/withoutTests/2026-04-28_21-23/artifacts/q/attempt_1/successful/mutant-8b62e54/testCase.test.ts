import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any rejection behavior", () => {
  it("should reject with an error message when all promises are rejected", async () => {
    const p1 = Q.reject(new Error("error 1"));
    const p2 = Q.reject(new Error("error 2"));
    const p3 = Q.reject(new Error("error 3"));

    let rejectionError: Error | undefined;
    try {
      await Q.any([p1, p2, p3]);
    } catch (err) {
      rejectionError = err as Error;
    }

    expect(rejectionError).toBeDefined();
    expect(rejectionError!.message).toContain("Q can't get fulfillment value from any promise");
    expect(rejectionError!.message).toContain("all promises were rejected");
  });
});