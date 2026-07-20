import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick flushing", () => {
  it("should set flushing to true and call requestTick synchronously when task is queued", () => {
    const calls: string[] = [];
    const originalNextTick = process.nextTick;
    
    // Replace process.nextTick to intercept requestTick calls synchronously
    (process as any).nextTick = function(fn: Function) {
      calls.push("requestTick");
      // Don't actually call fn to prevent flush from running
    };
    
    try {
      // Ensure we're in a clean state - flushing should be false
      // Queue a task via Q.nextTick
      Q.nextTick(function() { calls.push("task"); });
      
      // Original: !flushing is true -> requestTick() called -> calls has "requestTick"
      // Mutated: if (false) -> requestTick() never called -> calls is empty
      expect(calls).toContain("requestTick");
    } finally {
      process.nextTick = originalNextTick;
    }
  });
});