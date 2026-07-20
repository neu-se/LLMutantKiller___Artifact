const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.catch method", () => {
  it("should be accessible via Q.catch", () => {
    expect(typeof Q.catch).toBe("function");
    const promise = Q.reject(new Error("test error"));
    return Q.catch(promise, function (error: Error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("test error");
    });
  });
});