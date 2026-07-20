describe("hasStacks detection via module reload", () => {
  it("sets hasStacks=false when Error constructor produces objects without stack, disabling long stack trace capture", () => {
    const OriginalError = global.Error;
    
    // Replace Error with a version that doesn't set stack on instances
    function NoStackError(this: any, message?: string) {
      this.message = message || '';
      // Deliberately no stack property
    }
    NoStackError.prototype = Object.create(OriginalError.prototype);
    (global as any).Error = NoStackError;
    
    jest.resetModules();
    let Q2: any;
    try {
      Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      global.Error = OriginalError;
    }
    
    Q2.longStackSupport = true;
    const deferred = Q2.defer();
    const hasPromiseStack = Object.prototype.hasOwnProperty.call(deferred.promise, 'stack');
    Q2.longStackSupport = false;
    
    // Original: try { throw new Error() } catch(e) { hasStacks = !!e.stack }
    //   NoStackError has no stack → hasStacks = false → no stack on deferred promise
    // Mutated: try {} catch(e) { ... } (catch never runs)
    //   hasStacks stays true → stack IS captured on deferred promise
    expect(hasPromiseStack).toBe(false);
  });
});