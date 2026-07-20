import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf fallback", () => {
  it("correctly handles indexOf in fallback mode", () => {
    const orig = Array.prototype.indexOf;
    delete (Array.prototype as any).indexOf;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    (Array.prototype as any).indexOf = orig;
    
    QFresh.resetUnhandledRejections();
    
    const d = QFresh.defer();
    d.reject(new Error("test"));
    d.promise.fail(() => {});
    
    return new Promise<void>(r => setTimeout(r, 100)).then(() => {
      expect(QFresh.getUnhandledReasons().length).toBe(0);
    });
  });
});