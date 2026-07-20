import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces with null error", () => {
  it("correctly handles null rejection reason with long stack support and explicit rejected handler", () => {
    Q.longStackSupport = true;

    // Create a promise chain where a rejected handler re-throws null
    // The second .then's _rejected will call makeStackTraceLong(null, promise_without_stack)
    const p = Q.fulfill(1).then(function() {
      // This creates a promise WITH a stack (longStackSupport=true)
      // Now reject it with null from outside
      const d = Q.defer();
      // Resolve d's promise without stack by using a raw non-deferred promise
      return Q.reject(null);
    });

    return p.then(null, function(reason: unknown) {
      Q.longStackSupport = false;
      expect(reason).toBeNull();
    });
  });
});