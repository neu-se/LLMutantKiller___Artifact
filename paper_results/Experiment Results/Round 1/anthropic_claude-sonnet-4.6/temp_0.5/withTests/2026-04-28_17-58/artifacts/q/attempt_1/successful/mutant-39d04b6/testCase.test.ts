import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise inspect fallback behavior", () => {
  it("should return {state: 'unknown'} when inspect is not provided to makePromise", () => {
    // Q.makePromise is the Promise constructor exposed on Q
    // When called without an inspect function (third arg undefined),
    // the default inspect should return {state: "unknown"}
    const promise = Q.makePromise(
      {
        when: function() {
          return 42;
        }
      },
      function fallback(op: string) {
        return Q.reject(new Error("unsupported: " + op));
      }
      // no inspect argument - triggers the default inspect path
    );

    const inspected = promise.inspect();
    expect(inspected).toEqual({ state: "unknown" });
  });
});