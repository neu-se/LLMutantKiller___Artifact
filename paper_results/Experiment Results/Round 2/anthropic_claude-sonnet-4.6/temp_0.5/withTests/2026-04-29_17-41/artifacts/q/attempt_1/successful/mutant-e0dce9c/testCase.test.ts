import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior for rejected promises", () => {
  it("should return the promise itself when valueOf is called on a rejected promise", () => {
    const error = new Error("test rejection");
    const rejectedPromise = Q.reject(error);
    
    // valueOf() on a rejected promise should return the promise itself,
    // not undefined or the rejection reason.
    // With the mutation (state !== "rejected"), valueOf would fall through
    // to return inspected.value (undefined for rejected), breaking this behavior.
    const valueOfResult = rejectedPromise.valueOf();
    
    expect(valueOfResult).toBe(rejectedPromise);
  });
});