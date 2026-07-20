import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.timeout", () => {
  it("should reject with an Error object when timeout occurs without a custom error message", async () => {
    const neverResolves = Q.defer().promise;
    const timedOutPromise = neverResolves.timeout(50);

    let rejectionReason: any = "NOT_SET";
    await timedOutPromise.then(
      () => { throw new Error("Expected rejection but got fulfillment"); },
      (err: any) => { rejectionReason = err; }
    );

    // Original: if (!error || "string" === typeof error) creates Error object with message
    // Mutated: if (false) never creates Error, so rejectionReason is undefined
    expect(rejectionReason).toBeInstanceOf(Error);
    expect(rejectionReason.message).toMatch(/timed out/i);
  }, 10000);
});