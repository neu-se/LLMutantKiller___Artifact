import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("null rejection reason without long stack support", () => {
  it("preserves null as rejection reason when passed through rejected handler", () => {
    Q.longStackSupport = false;

    const results: unknown[] = [];

    return Q.reject(null)
      .then(
        null,
        function(reason: unknown) {
          results.push(reason);
          return Q.reject(null);
        }
      )
      .then(
        null,
        function(reason: unknown) {
          results.push(reason);
        }
      )
      .then(function() {
        expect(results[0]).toBeNull();
        expect(results[1]).toBeNull();
      });
  });
});