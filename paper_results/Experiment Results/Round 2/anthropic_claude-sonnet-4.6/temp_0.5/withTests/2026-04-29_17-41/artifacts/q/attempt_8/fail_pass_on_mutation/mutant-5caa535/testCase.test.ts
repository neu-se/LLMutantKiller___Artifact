import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_indexOf fallback", () => {
  it("correctly identifies missing elements in rejection tracking", (done) => {
    const orig = Array.prototype.indexOf;
    delete (Array.prototype as any).indexOf;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.indexOf = orig;
    
    QFresh.resetUnhandledRejections();
    
    const d = QFresh.defer();
    d.reject(new Error("test"));
    d.promise.fail(function() {});
    
    setTimeout(function() {
      try {
        expect(QFresh.getUnhandledReasons().length).toBe(0);
        done();
      } catch(e) {
        done(e);
      }
    }, 100);
  });
});