import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise exception property on fulfilled promise", () => {
  it("fulfilled promise should not have exception property", () => {
    const fulfilledPromise = Q.fulfill(42);
    // Original: exception only set when state === "rejected"  
    // Mutated: exception always set (if true), so fulfilled promise gets exception = undefined
    expect(Object.prototype.hasOwnProperty.call(fulfilledPromise, "exception")).toBe(false);
  });
});