import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick browser error path", () => {
  it("rethrows error via setTimeout when not in Node environment", (done) => {
    jest.resetModules();
    
    const capturedTimeouts: Array<{fn: Function, ms: number}> = [];
    const origSetTimeout = global.setTimeout;
    const origProcess = global.process;
    
    // Intercept setTimeout
    (global as any).setTimeout = (fn: Function, ms: number) => {
      capturedTimeouts.push({fn, ms});
      return 0 as any;
    };
    
    // Remove process to simulate browser environment (makes isNodeJS = false)
    delete (global as any).process;
    
    jest.isolateModules(() => {
      const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
      
      // Restore
      (global as any).process = origProcess;
      (global as any).setTimeout = origSetTimeout;
      
      const err = new Error("browser error");
      capturedTimeouts.length = 0;
      
      // Re-intercept for the task scheduling
      (global as any).setTimeout = (fn: Function, ms: number) => {
        capturedTimeouts.push({fn, ms});
        return 0 as any;
      };
      
      Q2.nextTick(() => { throw err; });
      
      // Manually trigger the queued flush (via MessageChannel or whatever was set up)
      // Since process was removed, requestTick uses setImmediate or MessageChannel or setTimeout
      // Run the captured setTimeout callbacks (which includes the requestTick flush)
      (global as any).setTimeout = origSetTimeout;
      
      const errorsThrown: Error[] = [];
      for (const {fn} of capturedTimeouts) {
        try { fn(); } catch(e) { errorsThrown.push(e as Error); }
      }
      
      // After flush runs with throwing task, in original: another setTimeout with throw e
      // In mutated: another setTimeout with empty function
      // Check if err was thrown from any setTimeout callback
      expect(errorsThrown).toContain(err);
      done();
    });
  });
});