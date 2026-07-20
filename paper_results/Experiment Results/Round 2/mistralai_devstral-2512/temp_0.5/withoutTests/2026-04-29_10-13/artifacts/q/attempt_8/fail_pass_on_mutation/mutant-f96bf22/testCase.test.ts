const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should properly filter internal frames from stack traces", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error");
      });

    try {
      await promise;
      fail("Expected promise to reject");
    } catch (error: any) {
      const stack = error.stack;
      expect(stack).toBeTruthy();

      // The mutation changes the filter condition to always return true
      // which would remove ALL frames. We check for the presence of
      // "From previous event" which indicates proper stack trace filtering
      const hasPreviousEventMarker = stack.includes("From previous event");

      // Original code should have this marker when long stack traces are enabled
      // Mutation would remove all frames including this marker
      expect(hasPreviousEventMarker).toBe(true);
    }
  });
});