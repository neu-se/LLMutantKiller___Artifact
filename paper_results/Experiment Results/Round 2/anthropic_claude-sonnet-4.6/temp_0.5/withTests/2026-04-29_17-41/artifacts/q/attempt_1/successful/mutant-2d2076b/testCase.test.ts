import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay with single argument", () => {
  it("should return a promise that resolves to undefined when called with only a timeout argument", async () => {
    const promise = Q.delay(50);

    // The promise should be pending initially
    expect(Q.isPending(promise)).toBe(true);

    const result = await promise;

    // When called with a single argument (the timeout), the resolved value should be undefined
    // In the original code: timeout === void 0 means single-arg case swaps object/timeout
    // so object becomes the delay and timeout stays undefined, resolving to undefined
    // In the mutated code: the condition is inverted, breaking this behavior
    expect(result).toBeUndefined();
    expect(Q.isFulfilled(promise)).toBe(true);
  });
});