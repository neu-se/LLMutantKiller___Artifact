describe("array_indexOf fallback", () => {
  it("correctly finds elements without going out of bounds", () => {
    jest.resetModules();
    const origIndexOf = Array.prototype.indexOf;
    delete (Array.prototype as any).indexOf;
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.indexOf = origIndexOf;
    
    Q.resetUnhandledRejections();
    const p1 = Q.reject(new Error("e1"));
    const p2 = Q.reject(new Error("e2"));
    p1.fail(() => {});
    
    return Q.delay(50).then(() => {
      expect(Q.getUnhandledReasons().length).toBe(1);
    });
  });
});