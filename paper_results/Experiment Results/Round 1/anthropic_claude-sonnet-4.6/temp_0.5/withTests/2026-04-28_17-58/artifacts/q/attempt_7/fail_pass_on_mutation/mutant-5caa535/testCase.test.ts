describe("Q array_indexOf fallback", () => {
  it("correctly tracks unhandled rejections with fallback indexOf", (done) => {
    jest.resetModules();
    const orig = Array.prototype.indexOf;
    delete (Array.prototype as any).indexOf;
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.indexOf = orig;
    Q.resetUnhandledRejections();
    const p = Q.reject(new Error("test"));
    p.fail(() => {});
    setTimeout(() => {
      expect(Q.getUnhandledReasons().length).toBe(0);
      done();
    }, 50);
  });
});