import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections", () => {
    const rejectionReason = "Test rejection reason";
    q.reject(rejectionReason);
    expect(q.getUnhandledReasons()).toEqual([`(no stack) ${rejectionReason}`]);
  });
});