import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected", () => {
  it("returns true for rejected promise and false for fulfilled", () => {
    const err = new Error("fail");
    const rejected = Q.reject(err);
    const fulfilled = Q.fulfill(42);
    
    rejected.then(null, () => {}); // suppress unhandled rejection
    
    expect(Q.isRejected(rejected)).toBe(true);
    expect(Q.isRejected(fulfilled)).toBe(false);
    expect(Q.isFulfilled(fulfilled)).toBe(true);
    expect(Q.isFulfilled(rejected)).toBe(false);
  });
});