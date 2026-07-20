import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.catch", () => {
  it("should be accessible as Promise.prototype['catch'] and handle rejections", async () => {
    const error = new Error("test error");
    const rejectedPromise = Q.reject(error);

    // The mutation changes Q["catch"] to Q[""] on Promise.prototype
    // So Promise.prototype["catch"] should exist and work in the original
    const result = await rejectedPromise["catch"](function(reason: Error) {
      return "caught: " + reason.message;
    });

    expect(result).toBe("caught: test error");
  });
});