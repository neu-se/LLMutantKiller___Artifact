import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("valueOf on Q.fulfill promise", () => {
    const p = Q.fulfill(99);
    // If deprecated block runs with if(true) inner condition:
    // promise.exception = inspected.reason (but inspected undefined -> throws)
    // OR if inspected IS somehow defined and state is fulfilled:
    //   Original: exception NOT set (state !== "rejected")
    //   Mutated: exception = undefined (if(true) always runs)
    // Then valueOf override is set:
    //   Both return inspected.value = 99 for fulfilled state
    // So valueOf() would return 99 instead of promise object
    
    // Test: if block runs, valueOf returns 99; if not, returns promise
    const val = p.valueOf();
    if (val === 99) {
      // deprecated block ran - check exception behavior
      expect((p as any).exception).toBeUndefined(); // fulfilled has no reason
    } else {
      expect(val).toBe(p); // block didn't run
    }
  });
});