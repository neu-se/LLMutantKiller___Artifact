import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise with no inspect function", () => {
  it("should not throw when creating a Promise without an inspect argument", () => {
    expect(() => {
      Q.makePromise(
        {
          "when": function() { return 42; }
        },
        undefined,
        undefined
      );
    }).not.toThrow();
  });
});