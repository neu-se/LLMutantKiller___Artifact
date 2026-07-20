import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections with stack trace", () => {
    const error = new Error("Test error");
    const promise = Q.reject(error);
    const unhandledReasons = Q.getUnhandledReasons();
    expect(unhandledReasons[0]).toContain(error.stack);
  });
});