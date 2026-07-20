import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then done guard", () => {
  it("should resolve with fulfilled value even when underlying promise calls both resolve and reject", () => {
    // Create a misbehaving thenable that calls both fulfilled and rejected
    const misbehavingThenable = {
      then: function (fulfilled: (v: unknown) => void, rejected: (r: unknown) => void) {
        fulfilled(42);
        rejected(new Error("should be ignored"));
      }
    };

    return Q(misbehavingThenable).then(
      function (value) {
        expect(value).toBe(42);
      },
      function () {
        throw new Error("rejected callback should not have been called");
      }
    );
  });
});