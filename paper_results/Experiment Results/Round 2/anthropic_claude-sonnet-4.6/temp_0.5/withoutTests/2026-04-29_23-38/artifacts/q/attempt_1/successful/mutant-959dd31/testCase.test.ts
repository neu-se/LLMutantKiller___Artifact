import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.timeout rejection error", () => {
  it("should reject with an Error object containing a timeout message when no custom error is provided", async () => {
    // Create a promise that never resolves
    const neverResolves = Q.promise(function () {
      // intentionally never resolve or reject
    });

    // Apply a very short timeout with no custom error
    const timedOutPromise = neverResolves.timeout(1);

    let caughtError: any;
    try {
      await timedOutPromise;
    } catch (e) {
      caughtError = e;
    }

    // The original code creates an Error with a message when no custom error is provided
    // The mutated code (if (false)) skips creating the error, so caughtError would be undefined
    expect(caughtError).toBeInstanceOf(Error);
    expect(caughtError.message).toContain("Timed out");
  });
});