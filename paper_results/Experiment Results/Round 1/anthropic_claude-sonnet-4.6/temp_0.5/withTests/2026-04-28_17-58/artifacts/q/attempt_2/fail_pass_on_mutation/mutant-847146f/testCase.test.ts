import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype['catch']", () => {
  it("should exist as a function on promise instances", () => {
    const promise = Q.reject(new Error("test"));
    // In the original code, Promise.prototype["catch"] is defined
    // In the mutated code, Promise.prototype[""] is defined instead, so ["catch"] will be undefined
    expect(typeof promise["catch"]).toBe("function");
  });
});