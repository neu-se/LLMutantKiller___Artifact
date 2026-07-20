import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.catch", () => {
  it("should be accessible as Promise.prototype['catch'] and handle rejections", async () => {
    const error = new Error("test rejection");
    const rejectedPromise = Q.reject(error);

    // The original code assigns the function to Promise.prototype["catch"]
    // The mutated code assigns it to Promise.prototype[""] instead
    // So accessing .catch on a promise should work in original but fail in mutated
    expect(typeof rejectedPromise["catch"]).toBe("function");

    const result = await rejectedPromise["catch"]((err: Error) => {
      return "caught: " + err.message;
    });

    expect(result).toBe("caught: test rejection");
  });
});