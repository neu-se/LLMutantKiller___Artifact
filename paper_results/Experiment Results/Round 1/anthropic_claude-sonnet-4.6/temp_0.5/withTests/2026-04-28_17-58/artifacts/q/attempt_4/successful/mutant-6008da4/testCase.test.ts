import * as realModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isNodeJS initial value", () => {
  it("does not call domain.enter for tasks when isNodeJS starts as false", (done) => {
    jest.resetModules();
    
    const mockDomain = { enter: jest.fn(), exit: jest.fn() };
    const originalProcess = (global as any).process;
    
    // Override process to fail Node.js detection (process.toString() !== "[object process]")
    // but provide a domain so we can detect if domain.enter is called
    (global as any).process = {
      toString: () => "[object Object]",
      domain: mockDomain,
      env: {}
    };
    
    // Re-require Q with the mocked process
    // isNodeJS will stay at initial value since Node.js detection fails
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Schedule a task - domain field is computed as: isNodeJS && process.domain
    // Original (isNodeJS=false): false && mockDomain = false
    // Mutant (isNodeJS=true): true && mockDomain = mockDomain
    Q.nextTick(() => {
      // empty task
    });
    
    // Restore real process
    (global as any).process = originalProcess;
    
    // Wait for the task to execute (Q uses setImmediate since process.nextTick unavailable)
    setImmediate(() => {
      setImmediate(() => {
        // Original: mockDomain.enter was NOT called (domain field was false)
        // Mutant: mockDomain.enter WAS called (domain field was mockDomain)
        expect(mockDomain.enter).not.toHaveBeenCalled();
        done();
      });
    });
  });
});