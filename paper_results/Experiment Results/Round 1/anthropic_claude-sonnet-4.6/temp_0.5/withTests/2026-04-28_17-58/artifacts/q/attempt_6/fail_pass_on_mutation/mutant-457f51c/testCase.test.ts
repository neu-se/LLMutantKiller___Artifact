import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q basic functionality", () => {
  it("nearer returns fulfilled value and pending promise stays as promise", () => {
    const fulfilled = Q(99);
    expect(Q.nearer(fulfilled)).toBe(99);
    
    const pending = Q.defer().promise;
    expect(Q.nearer(pending)).toBe(pending);
    
    const reason = new Error("fail");
    const rejected = Q.reject(reason);
    // nearer of rejected returns the rejected promise itself
    expect(Q.nearer(rejected)).toBe(rejected);
  });
});