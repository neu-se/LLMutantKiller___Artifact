const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.catch method", () => {
  it("should be accessible via Q.catch", () => {
    const promise = Q.reject(new Error("test error"));
    let caught = false;
    Q.catch(promise, function (error: Error) {
      caught = true;
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("test error");
    });
    expect(caught).toBe(true);
  });
});