import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("rejected promise does not have exception property set via deprecated support", () => {
    const err = new Error("test");
    const p = Q.reject(err);
    p.then(null, () => {});
    // In original (if false block inactive): exception not set
    // In mutated (if somehow active with if(true)): exception = err
    expect(Object.prototype.hasOwnProperty.call(p, 'exception')).toBe(false);
  });
});