import { createRequire } from "module";

describe("hasStacks mutation detection", () => {
  it("hasStacks initial value determines behavior when Error.stack getter throws", () => {
    const OriginalError = global.Error;
    
    // We need to make the Error class such that accessing .stack on a thrown error
    // causes an exception, preventing the assignment in the catch block
    const ProblematicError: any = function(this: any, message?: string) {
      this.message = message || '';
      Object.defineProperty(this, 'stack', {
        get() { 
          throw new OriginalError('stack access not allowed'); 
        },
        configurable: true
      });
    };
    ProblematicError.prototype = Object.create(OriginalError.prototype);
    ProblematicError.prototype.constructor = ProblematicError;
    // Copy static methods
    Object.setPrototypeOf(ProblematicError, OriginalError);
    
    global.Error = ProblematicError;
    
    jest.resetModules();
    
    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      global.Error = OriginalError;
      jest.resetModules();
    }
    
    Q.longStackSupport = true;
    const deferred = Q.defer();
    Q.longStackSupport = false;
    
    // Original: hasStacks starts false, stays false -> promise.stack undefined
    // Mutation: hasStacks starts true, stays true -> promise.stack is a string
    expect(deferred.promise.stack).toBeUndefined();
  });
});