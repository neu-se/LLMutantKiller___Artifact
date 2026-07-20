describe("Q Node.js environment detection", () => {
  it("uses process.toString() to distinguish real Node.js from fake environments", async () => {
    // Mock process.toString to simulate Browserify (fake Node environment)
    const originalToString = process.toString;
    (process as any).toString = () => "[object Object]";
    
    // Reset modules so Q re-evaluates the condition
    jest.resetModules();
    
    // Dynamically require Q with mocked toString
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Restore toString
    (process as any).toString = originalToString;
    
    // In original code: isNodeJS = false (toString doesn't match)
    // In mutated code: isNodeJS = true (condition is always true)
    
    // Observable difference: when isNodeJS=true, Q uses process.nextTick for scheduling
    // We can observe this by checking if Q.nextTick uses process.nextTick
    
    // Test: create a deferred and check scheduling behavior
    // When isNodeJS=false, Q falls through to setImmediate
    // When isNodeJS=true, Q uses process.nextTick
    
    // We can observe the ordering of microtasks vs macrotasks
    const order: string[] = [];
    
    await new Promise<void>((resolve) => {
      // process.nextTick fires before setImmediate
      process.nextTick(() => order.push("native-nextTick"));
      setImmediate(() => {
        order.push("setImmediate");
        resolve();
      });
      
      Q.nextTick(() => order.push("Q-nextTick"));
    });
    
    // If isNodeJS=false (original with mocked toString):
    //   Q uses setImmediate, so Q-nextTick fires with/after setImmediate
    // If isNodeJS=true (mutated):
    //   Q uses process.nextTick, so Q-nextTick fires before setImmediate
    
    // Original: native-nextTick, Q-nextTick (via setImmediate), setImmediate
    // OR: native-nextTick, setImmediate, Q-nextTick
    // Mutated: native-nextTick, Q-nextTick, setImmediate
    
    // The key: with original code, Q-nextTick should NOT come before setImmediate
    // With mutated code, Q-nextTick SHOULD come before setImmediate
    
    const qNextTickIndex = order.indexOf("Q-nextTick");
    const setImmediateIndex = order.indexOf("setImmediate");
    
    // Original (isNodeJS=false, uses setImmediate): Q-nextTick fires at same time or after setImmediate
    // Mutated (isNodeJS=true, uses process.nextTick): Q-nextTick fires before setImmediate
    expect(qNextTickIndex).toBeGreaterThan(setImmediateIndex - 1); // Q fires after or with setImmediate
  });
});