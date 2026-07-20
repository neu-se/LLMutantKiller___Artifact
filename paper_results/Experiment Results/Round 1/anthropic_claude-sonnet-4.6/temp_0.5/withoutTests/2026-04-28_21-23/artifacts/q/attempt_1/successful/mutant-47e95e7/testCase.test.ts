import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior for rejected promises", () => {
  it("should return the promise itself when valueOf is called on a rejected promise", () => {
    const reason = new Error("test rejection");
    const rejectedPromise = Q.reject(reason);
    
    // valueOf on a rejected promise should return the promise itself, not the reason
    const valueOfResult = rejectedPromise.valueOf();
    
    // The result should be the promise itself (an object), not the rejection reason
    expect(valueOfResult).toBe(rejectedPromise);
  });
});