import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise valueOf for fulfilled promise", () => {
  it("valueOf on a fulfilled promise returns the value not the promise", () => {
    const p = Q(42);
    expect(p.valueOf()).toBe(42);
  });
});