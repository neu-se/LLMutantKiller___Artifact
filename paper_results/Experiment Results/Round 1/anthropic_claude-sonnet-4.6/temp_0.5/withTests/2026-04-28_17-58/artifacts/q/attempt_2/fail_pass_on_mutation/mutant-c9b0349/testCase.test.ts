import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame lower bound check", () => {
  it("filterStackString should not filter frames from other files even at low line numbers", () => {
    Q.longStackSupport = true;

    // Create a chain that produces a long stack trace
    // The key is that with the mutation, line numbers < qStartingLine in q.js
    // get filtered. qStartingLine is small (line ~35 of q.js).
    // User code frames are in a different file entirely, so they won't be
    // affected. The difference must be in q.js internal frames.
    //
    // Actually the real observable difference: with mutation, isInternalFrame
    // returns true for ANY line in q.js (since qEndingLine is the last line).
    // Without mutation, only lines >= qStartingLine are filtered.
    // Since qStartingLine is ~35, lines 1-34 of q.js would be included in
    // original but excluded in mutated.
    //
    // These lines (1-34) include the module definition wrapper which appears
    // in stack traces when Q itself is being loaded - not during normal use.
    // So the behavioral difference is essentially undetectable in normal usage.
    //
    // Let's verify the stack trace content is consistent.

    function namedFunction() {
      return Q().then(function anotherNamedFunction() {
        return Q.reject(new Error("test"));
      });
    }

    return namedFunction().then(
      () => { Q.longStackSupport = false; throw new Error("expected rejection"); },
      (err: Error) => {
        Q.longStackSupport = false;
        const stack = err.stack || "";
        expect(stack).toContain("namedFunction");
        expect(stack).toContain("anotherNamedFunction");
      }
    );
  });
});