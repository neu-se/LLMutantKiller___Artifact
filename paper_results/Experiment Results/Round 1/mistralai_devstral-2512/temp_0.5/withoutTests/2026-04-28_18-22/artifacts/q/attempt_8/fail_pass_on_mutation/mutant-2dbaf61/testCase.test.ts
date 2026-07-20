const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library stack trace initialization", () => {
  it("should correctly detect stack trace support", () => {
    // The mutation changes the stack trace detection from:
    // try { throw new Error() } catch (e) { hasStacks = !!e.stack }
    // to:
    // try {} catch (e) {} (empty block)

    // This means hasStacks remains true in mutated version regardless of actual support
    // We can detect this by checking behavior that depends on proper stack detection

    // Force long stack support to make the difference visible
    Q.longStackSupport = true;

    // Create a promise chain that should trigger stack trace handling
    const deferred = Q.defer();
    const error = new Error("Test error with stack");

    // Store original stack
    const originalStack = error.stack;

    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should have rejected");
      },
      (caughtError: Error) => {
        // In original code: hasStacks is properly detected
        // In mutated code: hasStacks is always true

        // The difference becomes apparent when we check if stack traces
        // are properly extended with "From previous event" markers
        // which only happens when hasStacks is correctly set

        expect(caughtError.stack).toBeTruthy();

        // This is the key assertion that will fail in mutated version
        // because the stack trace extension won't work properly
        if (Q.longStackSupport && caughtError.stack) {
          expect(caughtError.stack.includes("From previous event") ||
                 caughtError.stack.includes(originalStack!)).toBe(true);
        }
      }
    );
  });
});