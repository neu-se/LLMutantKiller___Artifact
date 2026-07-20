describe("captureLine guard behavior", () => {
  it("should handle missing stacks gracefully at module load time", () => {
    // Save original
    const originalPrepareStackTrace = (Error as any).prepareStackTrace;
    
    jest.resetModules();
    
    // Make Error().stack falsy so hasStacks would be false
    // by intercepting at the prototype level before module loads
    const originalStackDescriptor = Object.getOwnPropertyDescriptor(Error.prototype, 'stack');
    
    let threw = false;
    
    // Patch Error so that new Error().stack is undefined
    const OrigError = Error;
    (global as any).Error = class PatchedError extends OrigError {
      constructor(...args: any[]) {
        super(...args);
        Object.defineProperty(this, 'stack', { value: undefined, configurable: true });
      }
    };
    (global as any).Error.prototype = OrigError.prototype;
    (global as any).Error.captureStackTrace = (OrigError as any).captureStackTrace;
    
    try {
      jest.isolateModules(() => {
        try {
          require("../../../../../../../../../../../subject_repositories/q/q.js");
        } catch (e) {
          threw = true;
        }
      });
    } finally {
      (global as any).Error = OrigError;
    }
    
    // Original: hasStacks=false -> captureLine returns early -> no crash
    // Mutant: if(false) -> never returns early -> tries e.stack.split() -> crashes
    expect(threw).toBe(false);
  });
});