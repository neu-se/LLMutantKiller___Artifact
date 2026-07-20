import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should set the exception property when a promise is rejected", () => {
    const promise = q.Promise.reject(new Error("Test error"));
    const inspected = promise.inspect();
    expect(inspected.state).toBe("rejected");
    expect(inspected.reason).toBeInstanceOf(Error);
    expect(promise.exception).toBe(inspected.reason);
  });
});