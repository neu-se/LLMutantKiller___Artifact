import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype['catch']", () => {
  it("should exist as 'catch' property and not as empty string property on Promise instances", () => {
    const promise = Q.reject(new Error("test"));

    // In the original code, "catch" is defined on Promise.prototype
    // In the mutated code, "" is defined instead of "catch"
    expect(typeof (promise as any)["catch"]).toBe("function");
    expect(typeof (promise as any)[""]).toBe("undefined");
  });
});