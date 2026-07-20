describe("Q MessageChannel scheduling", () => {
  it("should use MessageChannel when setImmediate is not available", (done) => {
    const originalSetImmediate = (global as any).setImmediate;
    const originalMessageChannel = (global as any).MessageChannel;
    
    // Remove setImmediate to force MessageChannel path
    delete (global as any).setImmediate;
    
    // Ensure MessageChannel is available
    if (typeof MessageChannel === "undefined") {
      (global as any).MessageChannel = class {
        port1: any = { onmessage: null };
        port2: any = { postMessage: () => { this.port1.onmessage && this.port1.onmessage(); } };
      };
    }
    
    jest.resetModules();
    
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    const results: number[] = [];
    Q.nextTick(() => results.push(1));
    Q.nextTick(() => {
      results.push(2);
      expect(results).toEqual([1, 2]);
      
      // Restore
      (global as any).setImmediate = originalSetImmediate;
      if (!originalMessageChannel) delete (global as any).MessageChannel;
      
      done();
    });
  });
});