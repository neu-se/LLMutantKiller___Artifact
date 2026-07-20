import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf fallback", () => {
  it("correctly tracks unhandled rejections using fallback indexOf", () => {
    const orig = Array.prototype.indexOf;
    delete (Array.prototype as any).indexOf;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    (Array.prototype as any).indexOf = orig;
    
    QFresh.resetUnhandledRejections();
    
    // Reject 3 promises, handle 2 of them
    const d1 = QFresh.defer();
    const d2 = QFresh.defer();  
    const d3 = QFresh.defer();
    
    d1.reject(new Error("err1"));
    d2.reject(new Error("err2"));
    d3.reject(new Error("err3"));
    
    // Handle d1 and d3, leave d2 unhandled
    d1.promise.fail(() => {});
    d3.promise.fail(() => {});
    
    return new Promise<void>(r => setTimeout(r, 100)).then(() => {
      // Only d2 should remain unhandled
      expect(QFresh.getUnhandledReasons().length).toBe(1);
      d2.promise.fail(() => {}); // cleanup
    });
  });
});