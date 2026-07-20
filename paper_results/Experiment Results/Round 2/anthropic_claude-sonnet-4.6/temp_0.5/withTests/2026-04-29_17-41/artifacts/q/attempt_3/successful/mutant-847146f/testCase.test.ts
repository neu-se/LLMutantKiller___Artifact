import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q['catch'] static method", () => {
  it("should exist as Q['catch'] and successfully catch rejections", async () => {
    const error = new Error("rejection reason");
    const rejectedPromise = Q.reject(error);

    // In original code, Q["catch"] is defined
    // In mutated code, Q[""] is defined instead of Q["catch"]
    const result = await (Q as any)["catch"](rejectedPromise, (err: Error) => {
      return "caught: " + err.message;
    });

    expect(result).toBe("caught: rejection reason");
  });
});