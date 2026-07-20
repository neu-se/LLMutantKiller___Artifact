describe("Q", () => {
  it("should use MessageChannel for scheduling when setImmediate unavailable", (done) => {
    jest.resetModules();
    
    const origSetImmediate = (global as any).setImmediate;
    const origProcessNextTick = process.nextTick;
    const origSetTimeout = global.setTimeout;
    
    // Remove setImmediate to force MessageChannel path
    delete (global as any).setImmediate;
    // Disable Node.js path
    (process as any).nextTick = undefined;
    
    const schedulerCalls: string[] = [];
    
    // Track setTimeout usage
    (global as any).setTimeout = (fn: Function, ms: number) => {
      if (ms === 0) schedulerCalls.push("setTimeout");
      return origSetTimeout(fn as TimerHandler, ms);
    };
    
    // Ensure MessageChannel is available and track it
    const OrigMessageChannel = (global as any).MessageChannel;
    let mcUsed = false;
    (global as any).MessageChannel = class {
      port1: any = { onmessage: null };
      port2: any;
      constructor() {
        const self = this;
        this.port2 = {
          postMessage: () => {
            mcUsed = true;
            if (self.port1.onmessage) self.port1.onmessage();
          }
        };
      }
    };
    
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    process.nextTick = origProcessNextTick;
    
    Q.nextTick(() => {
      (global as any).setImmediate = origSetImmediate;
      (global as any).setTimeout = origSetTimeout;
      (global as any).MessageChannel = OrigMessageChannel;
      
      // Original: MessageChannel used -> mcUsed = true, no setTimeout for flush
      // Mutated: setTimeout used -> schedulerCalls contains "setTimeout"
      expect(mcUsed).toBe(true);
      expect(schedulerCalls.length).toBe(0);
      done();
    });
  });
});