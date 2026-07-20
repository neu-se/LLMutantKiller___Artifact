import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString with error message line", () => {
  it("should not throw when processing stack lines that match no pattern", () => {
    Q.longStackSupport = true;

    const d = Q.defer();
    const err = new Error("test error");
    d.reject(err);

    return d.promise.fail((e: Error) => {
      expect(e.message).toBe("test error");
      Q.longStackSupport = false;
    });
  });
});