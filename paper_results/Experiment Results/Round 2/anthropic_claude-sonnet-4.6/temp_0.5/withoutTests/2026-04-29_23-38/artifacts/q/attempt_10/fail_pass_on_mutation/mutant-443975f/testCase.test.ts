import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q scheduling with fake timers", () => {
  it("resolves promises when process.nextTick is flushed via legacy fake timers", () => {
    jest.useFakeTimers({ legacyFakeTimers: true });

    let resolved = false;
    Q.resolve(42).then(() => { resolved = true; });

    expect(resolved).toBe(false);
    
    // Run all ticks (process.nextTick callbacks) - works for both original and mutated
    // since both use process.nextTick in Jest's environment
    jest.runAllTicks();
    
    expect(resolved).toBe(true);

    jest.useRealTimers();
  });
});