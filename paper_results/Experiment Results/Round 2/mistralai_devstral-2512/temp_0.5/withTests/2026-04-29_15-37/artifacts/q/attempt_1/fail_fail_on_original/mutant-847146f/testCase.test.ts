import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.catch method", () => {
  it("should be accessible as Q.catch", () => {
    const promise = Q.reject(new Error("test error"));
    const catchMethod = (Q as any)["catch"];
    expect(typeof catchMethod).toBe("function");
    return catchMethod(promise, (error: Error) => {
      expect(error.message).toBe("test error");
    });
  });
});