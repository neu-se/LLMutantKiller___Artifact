import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise descriptor exception handling", () => {
  it("should reject when a descriptor method throws an exception", () => {
    const thrownError = new Error("descriptor method threw");

    const badPromise = Q.makePromise({
      "get": function () {
        throw thrownError;
      }
    });

    return badPromise.get("anyProperty").then(
      function (value: unknown) {
        // In the mutated code, this branch is taken with value = undefined
        // This should NOT happen - the promise should be rejected
        throw new Error("Expected promise to be rejected, but it was fulfilled with: " + value);
      },
      function (reason: unknown) {
        // In the original code, this branch is taken with the thrown error
        expect(reason).toBe(thrownError);
      }
    );
  });
});