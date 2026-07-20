import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf fallback", () => {
  it("correctly handles indexOf with the fallback implementation", () => {
    const originalIndexOf = Array.prototype.indexOf;
    delete (Array.prototype as any).indexOf;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    (Array.prototype as any).indexOf = originalIndexOf;
    
    QFresh.resetUnhandledRejections();
    
    // Reject a promise and handle it - exercises array_indexOf in untrackRejection
    const deferred = QFresh.defer();
    deferred.reject(new Error("test"));
    deferred.promise.fail(function() {});
    
    return new Promise<void>(resolve => setTimeout(resolve, 50)).then(() => {
      expect(QFresh.getUnhandledReasons().length).toBe(0);
    });
  });
});