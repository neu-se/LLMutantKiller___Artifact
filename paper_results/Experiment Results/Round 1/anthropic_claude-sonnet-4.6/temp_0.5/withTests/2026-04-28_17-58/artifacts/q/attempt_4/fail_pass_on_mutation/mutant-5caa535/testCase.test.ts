describe("Q array_indexOf fallback", () => {
  it("correctly finds elements in arrays using fallback indexOf", (done) => {
    jest.resetModules();
    const origIndexOf = Array.prototype.indexOf;
    delete (Array.prototype as any).indexOf;
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.indexOf = origIndexOf;
    Q.resetUnhandledRejections();
    const p1 = Q.reject(new Error("e1"));
    const p2 = Q.reject(new Error("e2"));
    p1.fail(() => {});
    setTimeout(() => {
      expect(Q.getUnhandledReasons().length).toBe(1);
      done();
    }, 100);
  });
});