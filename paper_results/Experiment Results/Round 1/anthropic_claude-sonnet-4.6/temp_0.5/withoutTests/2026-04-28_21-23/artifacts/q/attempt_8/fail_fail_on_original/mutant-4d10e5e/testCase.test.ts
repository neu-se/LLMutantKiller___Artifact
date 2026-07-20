import { createRequire } from "module";

describe("hasStacks initialization", () => {
  it("fresh module load with no Error.stack should have hasStacks=false", () => {
    jest.resetModules();
    
    const origCaptureStackTrace = (Error as any).captureStackTrace;
    const OrigError = global.Error;
    
    (Error as any).captureStackTrace = undefined;
    (global as any).Error = class extends OrigError {
      constructor(msg?: string) {
        super(msg);
        delete (this as any).stack;
      }
    };
    (global as any).Error.prototype = OrigError.prototype;
    
    let QFresh: any;
    try {
      QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      (Error as any).captureStackTrace = origCaptureStackTrace;
      (global as any).Error = OrigError;
    }
    
    // In original: hasStacks=false (initial) → try/catch sets false → stays false
    //   → defer() with longStackSupport=true: longStackSupport && hasStacks = false → no stack
    // In mutated: hasStacks=true (initial) → try/catch sets false → becomes false
    //   → defer() with longStackSupport=true: longStackSupport && hasStacks = false → no stack
    // SAME! Both undefined.
    
    QFresh.longStackSupport = true;
    const deferred = QFresh.defer();
    expect(deferred.promise.stack).toBeUndefined();
  });
});