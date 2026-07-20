import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks initialization", () => {
  it("should correctly initialize hasStacks", () => {
    jest.resetModules();
    
    const origCaptureStackTrace = (Error as any).captureStackTrace;
    (Error as any).captureStackTrace = () => {};
    
    let QFresh: any;
    try {
      QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      (Error as any).captureStackTrace = origCaptureStackTrace;
    }
    
    QFresh.longStackSupport = true;
    const deferred = QFresh.defer();
    expect(deferred.promise.stack).toBeUndefined();
  });
});