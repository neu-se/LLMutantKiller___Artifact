import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should track rejection with stack when reason has a stack property", () => {
    const error = new Error("test error");
    Q.reject(error);
    const reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBe(1);
    expect(reasons[0]).toBe(error.stack);
  });
});