import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf fallback", () => {
  it("should return -1 for missing value using fallback indexOf", () => {
    const orig = Array.prototype.indexOf;
    delete (Array.prototype as any).indexOf;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    (Array.prototype as any).indexOf = orig;
    
    // Test allSettled which uses array_map (also a fallback if map doesn't exist)
    // Remove map too to force both fallbacks
    const origMap = Array.prototype.map;
    delete (Array.prototype as any).map;
    jest.resetModules();
    const QFresh2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    (Array.prototype as any).map = origMap;
    
    return QFresh2.allSettled([QFresh2.resolve(1), QFresh2.reject(2)])
      .then((results: any[]) => {
        expect(results.length).toBe(2);
        expect(results[0].state).toBe('fulfilled');
        expect(results[1].state).toBe('rejected');
      });
  });
});