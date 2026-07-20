import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections", () => {
    const rejectionReason = "Test rejection reason";
    Q.reject(rejectionReason);
    expect(Q.getUnhandledReasons()).toEqual([`(no stack) ${rejectionReason}`]);
  });
});