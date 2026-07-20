import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("rejection with null reason", () => {
  it("should propagate null as the rejection reason through a then chain", () => {
    Q.longStackSupport = false;

    return Q.reject(null)
      .then(null, (reason: unknown) => {
        // Re-reject with null to trigger makeStackTraceLong in next handler
        throw null;
      })
      .then(null, (reason: unknown) => {
        // In mutated code, reason would be a TypeError (from null.stack)
        // In original code, reason would be null
        expect(reason).toBeNull();
      });
  });
});