import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf for rejected promise", () => {
  it("should return the promise itself (not undefined) when valueOf is called on a rejected promise", () => {
    const error = new Error("test rejection");
    const rejectedPromise = Q.reject(error);
    
    // valueOf on a rejected promise should return the promise itself, not undefined
    const result = rejectedPromise.valueOf();
    
    expect(result).toBe(rejectedPromise);
  });
});