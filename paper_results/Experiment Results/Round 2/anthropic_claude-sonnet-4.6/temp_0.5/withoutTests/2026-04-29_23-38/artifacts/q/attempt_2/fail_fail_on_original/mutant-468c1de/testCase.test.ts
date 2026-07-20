import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
  it("should only update __minimumStackCounter__ when a smaller stackCounter is found", async () => {
    Q.longStackSupport = true;

    // We need to create a non-monotonic source chain where:
    // traversal order has counters: HIGH -> LOW -> MID
    // Original: __minimumStackCounter__ = LOW (the minimum)
    // Mutated:  __minimumStackCounter__ = MID (the last one, since condition is always true)

    // Create promises in order to get known counter ordering
    const dLow = Q.defer();
    const dMid = Q.defer();
    const dHigh = Q.defer();

    const scLow = (dLow.promise as any).stackCounter;
    const scMid = (dMid.promise as any).stackCounter;
    const scHigh = (dHigh.promise as any).stackCounter;

    expect(scLow).toBeLessThan(scMid);
    expect(scMid).toBeLessThan(scHigh);

    // Manually set up source chain: dHigh -> dLow -> dMid
    // Traversal: scHigh, scLow, scMid
    // Original:
    //   p=dHigh: no __minimumStackCounter__, set to scHigh
    //   p=dLow:  scHigh > scLow, update to scLow
    //   p=dMid:  scLow > scMid? NO (scLow < scMid), keep scLow
    //   Result: scLow
    // Mutated (always true):
    //   p=dHigh: set to scHigh
    //   p=dLow:  set to scLow
    //   p=dMid:  set to scMid
    //   Result: scMid  (different from scLow!)

    // Set up stacks on all promises
    (dHigh.promise as any).stack = "Error\n    at high (high.js:1:1)";
    (dLow.promise as any).stack = "Error\n    at low (low.js:1:1)";
    (dMid.promise as any).stack = "Error\n    at mid (mid.js:1:1)";

    (dHigh.promise as any).source = dLow.promise;
    (dLow.promise as any).source = dMid.promise;

    const testError: any = new Error("test");
    testError.stack = "Error: test\n    at test (test.js:1:1)";

    // Trigger makeStackTraceLong by rejecting and catching
    let caughtError: any = null;
    const catchPromise = dHigh.promise.then(null, function(e: any) {
      caughtError = e;
      return null;
    });

    dHigh.reject(testError);

    await new Promise<void>((resolve) => setTimeout(resolve, 100));

    expect(caughtError).not.toBeNull();

    if (typeof caughtError.__minimumStackCounter__ !== "undefined") {
      // Original: scLow (the true minimum of scHigh, scLow, scMid)
      // Mutated:  scMid (the last value set, since condition is always true)
      expect(caughtError.__minimumStackCounter__).toBe(scLow);
    } else {
      // makeStackTraceLong didn't set it - force failure to indicate unexpected state
      throw new Error("__minimumStackCounter__ was not set by makeStackTraceLong");
    }
  });
});