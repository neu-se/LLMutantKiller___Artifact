import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks initialization", () => {
  it("should have qStartingLine defined only when hasStacks is true at captureLine call time", () => {
    // captureLine() is called before the try/catch that sets hasStacks = !!e.stack
    // In original: hasStacks = false at captureLine() call, so captureLine returns undefined
    // In mutated: hasStacks = true at captureLine() call, so captureLine returns a line number
    // The effect: with original, long stack trace filtering uses undefined qStartingLine
    // We can observe this via stack trace filtering behavior with longStackSupport

    Q.longStackSupport = true;
    const deferred = Q.defer();
    const error = new Error("test error");

    // With original (hasStacks=false initially), qStartingLine is undefined
    // so isInternalFrame always returns false, and stack filtering doesn't strip Q internals
    // With mutated (hasStacks=true initially), qStartingLine is set, Q internals get filtered

    return Q.reject(error)
      .then(null, function(err: Error) {
        const stack = err.stack || "";
        // In original code, Q internal frames are NOT filtered (qStartingLine undefined)
        // so q.js frames appear in the stack
        // In mutated code, Q internal frames ARE filtered out
        // We check that q.js appears in the stack (original behavior)
        expect(stack).toMatch(/q\.js/);
        Q.longStackSupport = false;
      });
  });
});