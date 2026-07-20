import q from "./q.js";

describe("q", () => {
  it("should handle unhandled rejections correctly", () => {
    const promise = q.reject("Test rejection");
    q.nextTick.runAfter(() => {
      const unhandledRejections = q.getUnhandledReasons();
      expect(unhandledRejections).toHaveLength(1);
      q.resetUnhandledRejections();
      const newUnhandledRejections = q.getUnhandledReasons();
      expect(newUnhandledRejections).toHaveLength(0);
      // This line should cause the test to fail when run against the mutated code
      expect(unhandledRejections[0]).toContain("Test rejection");
    });
  });
});