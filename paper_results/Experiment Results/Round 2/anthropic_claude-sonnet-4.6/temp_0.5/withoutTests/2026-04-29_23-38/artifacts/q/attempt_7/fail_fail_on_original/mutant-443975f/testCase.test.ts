import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q scheduling detection via fake timers", () => {
  it("Q uses setImmediate - tasks pending until setImmediate is flushed", async () => {
    jest.useFakeTimers({ doNotFake: ['process.nextTick'] });
    
    let resolved = false;
    Q.resolve(42).then(() => { resolved = true; });
    
    // With fake timers, if Q uses setImmediate, it won't have run yet
    expect(resolved).toBe(false);
    
    jest.runAllImmediates();
    
    // Now it should be resolved
    await Promise.resolve(); // flush microtasks
    expect(resolved).toBe(true);
    
    jest.useRealTimers();
  });
});