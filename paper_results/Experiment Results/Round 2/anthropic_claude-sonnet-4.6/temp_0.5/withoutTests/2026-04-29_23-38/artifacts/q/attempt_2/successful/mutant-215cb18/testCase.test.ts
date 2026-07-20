import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty fallback", () => {
  it("should set property value in fallback when Object.defineProperty is unavailable", async () => {
    jest.resetModules();
    
    const realDefineProperty = Object.defineProperty;
    
    // Make Object.defineProperty configurable so we can override it
    realDefineProperty(Object, 'defineProperty', {
      configurable: true,
      writable: true,
      value: realDefineProperty
    });
    
    // Remove Object.defineProperty to force fallback path in Q
    // @ts-ignore
    Object.defineProperty = null;
    
    let QModule: any;
    try {
      QModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      // @ts-ignore
      Object.defineProperty = realDefineProperty;
    }
    
    QModule.longStackSupport = true;
    
    const err = new Error("test error");
    const result = await QModule(1)
      .then(function() { throw err; })
      .then(null, function(e) { return e; });
    
    expect(result.stack).toContain("From previous event:");
  });
});