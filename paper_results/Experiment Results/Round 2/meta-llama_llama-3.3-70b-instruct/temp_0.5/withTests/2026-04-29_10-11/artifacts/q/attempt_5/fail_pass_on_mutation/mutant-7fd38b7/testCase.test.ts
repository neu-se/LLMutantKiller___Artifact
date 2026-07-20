import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should reset unhandled rejections tracking", () => {
    q.resetUnhandledRejections();
    q.resetUnhandledRejections();
    expect(q.getUnhandledReasons()).toEqual([]);
  });
});