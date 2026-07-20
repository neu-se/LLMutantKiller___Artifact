import { defer } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q deferred promise resolution", () => {
  it("should properly handle deferred resolution with pending messages", (done) => {
    const deferred = defer();
    let resolvedValue: string | null = null;
    let error: Error | null = null;

    // Add handler before resolving
    deferred.promise.then(
      (value) => { resolvedValue = value; },
      (err) => { error = err; }
    ).finally(() => {
      try {
        expect(resolvedValue).toBe("test");
        expect(error).toBeNull();
        done();
      } catch (e) {
        done(e);
      }
    });

    // Resolve the deferred
    deferred.resolve("test");
  });
});