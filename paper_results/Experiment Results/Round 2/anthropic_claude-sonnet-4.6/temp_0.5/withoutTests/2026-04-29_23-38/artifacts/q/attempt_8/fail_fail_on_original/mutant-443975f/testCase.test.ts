import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q setImmediate branch detection", () => {
  it("Q tasks are pending until setImmediate is flushed with legacy fake timers", () => {
    jest.useFakeTimers("legacy");
    
    let resolved = false;
    Q.resolve(42).then(() => { resolved = true; });
    
    // If Q uses setImmediate: resolved is still false (fake setImmediate hasn't run)
    // If Q uses process.nextTick: resolved might already be true
    expect(resolved).toBe(false);
    
    jest.runAllImmediates();
    
    expect(resolved).toBe(true);
    
    jest.useRealTimers();
  });
});