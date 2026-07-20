import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
  it("should track unhandled rejections correctly", () => {
    Q.stopUnhandledRejectionTracking();
    const promise = Q.reject("Test rejection");
    Q.nextTick.runAfter(() => {
      expect(Q.getUnhandledReasons()).toHaveLength(0);
    });
    Q.startUnhandledRejectionTracking();
    Q.nextTick.runAfter(() => {
      expect(Q.getUnhandledReasons()).toHaveLength(1);
    });
  });
});