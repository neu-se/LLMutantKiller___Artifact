import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections", () => {
    const error = new Error("Test error");
    const promise = Q.reject(error);
    Q.resetUnhandledRejections();
    const unhandledReasons = Q.getUnhandledReasons();
    expect(unhandledReasons.length).toBe(0);
    promise.catch(() => {});
    const newUnhandledReasons = Q.getUnhandledReasons();
    expect(newUnhandledReasons.length).toBe(0);
    const promise2 = Q.reject(new Error("Test error 2"));
    const unhandledReasons2 = Q.getUnhandledReasons();
    expect(unhandledReasons2.length).toBe(1);
    expect(unhandledReasons2[0]).toContain("Test error 2");
    expect(unhandledReasons2[0]).not.toContain("(no stack)");
  });
});