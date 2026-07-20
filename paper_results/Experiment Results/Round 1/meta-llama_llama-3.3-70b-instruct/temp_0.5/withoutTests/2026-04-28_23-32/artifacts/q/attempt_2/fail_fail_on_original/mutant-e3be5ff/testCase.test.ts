import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should not track unhandled rejections when trackUnhandledRejections is false", () => {
    Q.stopUnhandledRejectionTracking();
    const promise = Q.reject("Test rejection");
    expect(Q.getUnhandledReasons()).toEqual([]);
  });
});