import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle unhandled rejections correctly", () => {
    const promise = Q.reject("Test rejection");
    Q.nextTick.runAfter(() => {
      const unhandledRejections = Q.getUnhandledReasons();
      expect(unhandledRejections).toHaveLength(1);
      Q.resetUnhandledRejections();
      const newUnhandledRejections = Q.getUnhandledReasons();
      expect(newUnhandledRejections).toHaveLength(0);
    });
  });
});