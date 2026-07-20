import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q fulfill valueOf", () => {
  it("fulfilled promise valueOf returns the fulfilled value not the promise", () => {
    const p = Q.fulfill(42);
    // In the mutant if if(true) ran, valueOf would be overridden
    // to return promise for pending/rejected, or inspected.value for fulfilled
    const result = p.valueOf();
    expect(result).toBe(42);
  });
});