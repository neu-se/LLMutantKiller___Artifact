import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections after reset", () => {
    q.trackUnhandledRejections = false;
    q.reject("test");
    q.resetUnhandledRejections();
    q.reject("test2");
    expect(q.getUnhandledReasons()).toEqual([`(no stack) test2`]);
  });
});