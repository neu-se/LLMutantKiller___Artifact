import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.finally static method", () => {
  it("should propagate rejection through finally when callback throws", () => {
    const exception1 = new Error("original error");
    const exception2 = new Error("callback error");

    return Q["finally"](Q.reject(exception1), function () {
      throw exception2;
    }).then(
      function () {
        throw new Error("should not fulfill");
      },
      function (err: any) {
        expect(err).toBe(exception2);
      }
    );
  });
});