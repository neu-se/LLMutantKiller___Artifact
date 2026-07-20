describe("Q hasStacks initialization", () => {
  it("correctly detects stack support by throwing an error during initialization", () => {
    const OriginalError = global.Error;
    
    // Create a replacement Error that doesn't set stack on instances
    function NoStackError(this: any, message?: string) {
      this.message = message || "";
      this.name = "Error";
      // Intentionally no stack
    }
    NoStackError.prototype = Object.create(OriginalError.prototype);
    NoStackError.prototype.constructor = NoStackError;
    
    (global as any).Error = NoStackError;
    
    let Q2: any;
    jest.isolateModules(() => {
      Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    });
    
    global.Error = OriginalError;
    
    Q2.longStackSupport = true;
    const deferred = Q2.defer();
    
    expect(deferred.promise.stack).toBeUndefined();
  });
});