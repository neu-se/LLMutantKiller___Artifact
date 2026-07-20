import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay with single argument", () => {
  it("should treat a single argument as a time delay and return a fulfilled promise", async () => {
    const promise = Q.delay(50);
    
    // The promise should be a valid Q promise
    expect(Q.isPromise(promise)).toBe(true);
    
    // The promise should eventually fulfill (not reject)
    const value = await promise;
    
    // When called with a single argument (time), the resolved value should be undefined
    expect(value).toBeUndefined();
  });
});