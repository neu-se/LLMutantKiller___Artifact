import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q object_create fallback", () => {
  it("should work when Object.create is unavailable by using the fallback", async () => {
    const originalCreate = Object.create;
    // @ts-ignore
    Object.create = undefined;
    
    jest.resetModules();
    // Re-require the module without Object.create
    const QModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    Object.create = originalCreate;
    
    const d = QModule.defer();
    d.resolve(42);
    const val = await d.promise;
    expect(val).toBe(42);
  });
});