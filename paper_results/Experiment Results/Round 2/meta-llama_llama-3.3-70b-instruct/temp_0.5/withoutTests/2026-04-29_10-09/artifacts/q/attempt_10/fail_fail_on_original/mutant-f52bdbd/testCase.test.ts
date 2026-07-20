import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections", () => {
    const error = new Error("Test error");
    const promise = Q.reject(error);
    Q.resetUnhandledRejections();
    expect(Q.getUnhandledReasons().length).toBe(1);
    expect(Q.getUnhandledReasons()[0]).toContain(error.stack);
  });
});