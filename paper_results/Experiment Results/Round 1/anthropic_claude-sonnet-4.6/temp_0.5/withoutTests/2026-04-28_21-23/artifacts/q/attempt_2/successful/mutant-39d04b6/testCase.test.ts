import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.makePromise without inspect", () => {
  it("should not throw when Promise is constructed without an inspect function", () => {
    // When inspect is not provided, the default inspect should return {state: "unknown"}
    // In the mutated code, inspect returns undefined, causing inspected.state to throw
    expect(() => {
      Q.makePromise(
        { "when": function() { return 42; } },
        function fallback() { return this; }
        // no inspect argument - triggers the default inspect fallback
      );
    }).not.toThrow();
  });
});