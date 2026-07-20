import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise descriptor exception handling", () => {
  it("should reject the promise when a descriptor method throws an exception", async () => {
    const error = new Error("descriptor threw");

    // Create a promise using Q.makePromise (which is the Promise constructor)
    // with a descriptor whose "when" method throws
    const p = Q.makePromise({
      "when": function() {
        throw error;
      }
    });

    // When we call .then() on this promise, it dispatches "when"
    // The descriptor's "when" throws, so the result should be a rejection
    let rejectedReason: any = null;
    let fulfilledValue: any = "NOT_SET";

    await p.then(
      (value: any) => { fulfilledValue = value; },
      (reason: any) => { rejectedReason = reason; }
    );

    // In original: result = reject(exception), so resolve(reject(exception)) -> rejection propagates
    // In mutated: result = undefined, so resolve(undefined) -> fulfills with undefined
    expect(rejectedReason).toBe(error);
    expect(fulfilledValue).toBe("NOT_SET");
  });
});