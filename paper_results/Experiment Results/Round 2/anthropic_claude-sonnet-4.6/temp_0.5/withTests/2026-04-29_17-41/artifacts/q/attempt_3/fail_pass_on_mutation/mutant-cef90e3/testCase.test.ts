import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then done guard in fulfilled path", () => {
  it("should resolve the returned promise with the fulfilled value, not with undefined rejection", () => {
    const fulfilled = Q(99);

    return fulfilled.then(
      function (value: unknown) {
        return value;
      },
      function () {
        throw new Error("rejection handler should not be called");
      }
    ).then(function (result: unknown) {
      expect(result).toBe(99);
    });
  });
});