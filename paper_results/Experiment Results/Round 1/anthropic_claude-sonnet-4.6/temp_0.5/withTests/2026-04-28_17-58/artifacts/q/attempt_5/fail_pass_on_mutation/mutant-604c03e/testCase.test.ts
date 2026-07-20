import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("preserves all unhandled rejections when a non-tracked promise rejection handler fires", () => {
    Q.resetUnhandledRejections();

    // Populate unhandled rejections list with two errors
    const err1 = new Error("keeper one");
    const err2 = new Error("keeper two");
    Q.reject(err1);
    Q.reject(err2);

    // Now create a fulfilled promise and add a rejection handler to it
    // When the fulfilled promise's rejection handler fires, untrackRejection
    // is called with a promise that has no rejection (it's fulfilled),
    // so array_indexOf returns -1.
    // Original (at !== -1): does nothing, list stays length 2
    // Mutated (true): splice(-1, 1) removes last element, list becomes length 1
    return Q(42).fail(function() {
      return "handled";
    }).then(function() {
      return new Promise<void>(resolve => setTimeout(resolve, 50));
    }).then(function() {
      const reasons = Q.getUnhandledReasons();
      expect(reasons.length).toBe(2);
      expect(reasons[0]).toContain("keeper one");
      expect(reasons[1]).toContain("keeper two");
    });
  });
});