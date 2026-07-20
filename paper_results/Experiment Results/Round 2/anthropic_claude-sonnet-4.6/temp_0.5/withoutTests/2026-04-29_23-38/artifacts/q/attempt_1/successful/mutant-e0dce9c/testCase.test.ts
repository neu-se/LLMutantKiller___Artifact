import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior for rejected promises", () => {
  it("should return the promise itself when valueOf is called on a rejected promise", () => {
    const reason = new Error("test rejection");
    const rejectedPromise = Q.reject(reason);
    
    // For a rejected promise, valueOf() should return the promise itself
    // In the original code: state === "rejected" causes early return of promise
    // In the mutated code: state !== "rejected" means rejected state falls through
    // and returns inspected.value (undefined) instead of the promise
    const valueOfResult = rejectedPromise.valueOf();
    
    // The valueOf() of a rejected promise should be the promise itself
    expect(valueOfResult).toBe(rejectedPromise);
  });
});