import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should stop tracking unhandled rejections after calling Q.stopUnhandledRejectionTracking", () => {
    Q.resetUnhandledRejections();
    Q.reject("test reason 1");
    expect(Q.getUnhandledReasons().length).toBe(1);

    Q.stopUnhandledRejectionTracking();
    Q.reject("test reason 2");

    expect(Q.getUnhandledReasons().length).toBe(1);
    expect(Q.getUnhandledReasons()[0]).toContain("test reason 1");
  });
});