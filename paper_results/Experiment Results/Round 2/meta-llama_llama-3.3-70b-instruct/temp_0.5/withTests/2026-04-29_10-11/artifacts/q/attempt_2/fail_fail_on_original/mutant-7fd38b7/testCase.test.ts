import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections", () => {
    const rejectionReason = "Test rejection reason";
    q.Q.reject(rejectionReason);
    expect(q.Q.getUnhandledReasons()).toEqual([`(no stack) ${rejectionReason}`]);
  });
});