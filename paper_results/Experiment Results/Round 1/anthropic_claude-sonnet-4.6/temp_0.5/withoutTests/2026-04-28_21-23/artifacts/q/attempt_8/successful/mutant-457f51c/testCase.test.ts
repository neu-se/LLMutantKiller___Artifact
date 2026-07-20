import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("fulfilled promise should not have exception property set", () => {
    const p = Q.fulfill(42);
    expect(Object.prototype.hasOwnProperty.call(p, 'exception')).toBe(false);
  });
});