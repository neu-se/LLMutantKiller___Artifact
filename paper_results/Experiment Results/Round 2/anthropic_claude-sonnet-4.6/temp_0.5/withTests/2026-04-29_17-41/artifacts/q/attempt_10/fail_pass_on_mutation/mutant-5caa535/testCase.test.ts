import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_indexOf fallback", () => {
  it("Q.any rejects correctly when all promises reject using fallback indexOf", () => {
    const orig = Array.prototype.indexOf;
    delete (Array.prototype as any).indexOf;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.indexOf = orig;

    return QFresh.any([QFresh.reject(new Error("a")), QFresh.reject(new Error("b"))])
      .then(
        () => { throw new Error("should have rejected"); },
        (err: any) => {
          expect(err.message).toContain("Q can't get fulfillment value");
        }
      );
  });
});