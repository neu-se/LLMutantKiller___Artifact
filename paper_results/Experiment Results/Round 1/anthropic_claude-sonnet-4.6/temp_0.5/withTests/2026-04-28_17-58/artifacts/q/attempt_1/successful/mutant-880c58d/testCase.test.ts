import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.longStackSupport default value", () => {
  it("should be false by default when Q_DEBUG environment variable is not set", () => {
    // The mutation changes the condition to `if (true)`, which always sets
    // Q.longStackSupport = true. In the original code, it only sets it to true
    // when process.env.Q_DEBUG is set.
    // 
    // We verify the initial state of longStackSupport is false when Q_DEBUG is not set.
    // This test must run without Q_DEBUG set in the environment.
    const qDebugWasSet = !!process.env.Q_DEBUG;
    
    if (qDebugWasSet) {
      // If Q_DEBUG is set in the environment, we can't distinguish the mutation
      // Skip by making this a no-op pass - but in practice test environments won't have this set
      expect(Q.longStackSupport).toBe(true);
    } else {
      // Without Q_DEBUG set, the original code leaves longStackSupport as false
      // The mutated code sets it to true unconditionally
      expect(Q.longStackSupport).toBe(false);
    }
  });
});