import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle unhandled rejections correctly", () => {
    const promise = Q.reject("Test rejection");
    Q.nextTick.runAfter(() => {
      const unhandledRejections = Q.getUnhandledReasons();
      expect(unhandledRejections).toHaveLength(1);
      Q.resetUnhandledRejections();
      const newUnhandledRejections = Q.getUnhandledReasons();
      expect(newUnhandledRejections).toHaveLength(0);
      // This line should cause the test to fail when run against the mutated code
      expect(unhandledRejections[0]).toBe("Test rejection");
    });
  });
});