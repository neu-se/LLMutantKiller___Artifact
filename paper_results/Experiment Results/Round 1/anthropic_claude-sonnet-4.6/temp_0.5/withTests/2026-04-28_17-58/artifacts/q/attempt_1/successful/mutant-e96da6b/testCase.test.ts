import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay with single argument", () => {
  it("should return a fulfilled promise when called with only a timeout argument (single-argument form)", async () => {
    const promise = Q.delay(50);
    expect(Q.isPromise(promise)).toBe(true);
    const result = await promise;
    // When called with a single argument, Q.delay should treat it as a timeout
    // and resolve with undefined after that time
    expect(result).toBeUndefined();
  });
});