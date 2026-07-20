describe("captureLine with hasStacks false simulation", () => {
  it("original returns undefined when hasStacks false, mutant throws or behaves differently", () => {
    // Reset modules to re-evaluate with modified Error
    jest.resetModules();
    
    // Make Error().stack undefined to simulate hasStacks=false
    const originalDescriptor = Object.getOwnPropertyDescriptor(Error.prototype, 'stack');
    
    // Temporarily make stacks unavailable during module load
    Object.defineProperty(Error.prototype, 'stack', {
      get: () => undefined,
      configurable: true
    });
    
    let loadError: Error | null = null;
    let QModule: any = null;
    
    try {
      QModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } catch (e) {
      loadError = e as Error;
    } finally {
      // Restore
      if (originalDescriptor) {
        Object.defineProperty(Error.prototype, 'stack', originalDescriptor);
      }
    }
    
    // Original: hasStacks=false, captureLine returns early (undefined) - no crash
    // Mutated: if(false) never returns early, tries e.stack.split() where e.stack
    //          is undefined -> THROWS TypeError
    expect(loadError).toBeNull();
    expect(QModule).not.toBeNull();
  });
});