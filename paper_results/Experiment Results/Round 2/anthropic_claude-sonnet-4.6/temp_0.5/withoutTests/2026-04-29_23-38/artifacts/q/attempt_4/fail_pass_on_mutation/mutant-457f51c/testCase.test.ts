import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise valueOf on fulfilled promise", () => {
  it("valueOf on a fulfilled promise returns the value not the promise", () => {
    const p = Q(42);
    // valueOf should return the fulfilled value for a fulfilled promise
    const val = p.valueOf();
    expect(val).toBe(42);
  });
});