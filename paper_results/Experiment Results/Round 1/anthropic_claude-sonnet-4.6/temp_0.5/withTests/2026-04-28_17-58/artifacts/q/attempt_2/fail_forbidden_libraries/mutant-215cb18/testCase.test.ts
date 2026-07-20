import { jest } from "@jest/globals";

describe("object_defineProperty fallback", () => {
  it("should set property value using fallback when Object.defineProperty is not available at module load time", async () => {
    // Save the original
    const savedDefineProperty = Object.defineProperty;
    
    // Temporarily make Object.defineProperty falsy so the fallback is used
    Object.defineProperty(Object, 'defineProperty', {
      value: undefined,
      writable: true,
      configurable: true
    });
    
    jest.resetModules();
    
    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      // Restore Object.defineProperty
      Object.defineProperty(Object, 'defineProperty', {
        value: savedDefineProperty,
        writable: true,
        configurable: true
      });
    }
    
    Q.longStackSupport = true;
    
    try {
      const errorCaught = await new Promise<Error>((resolve) => {
        Q().then(() => {
          throw new Error("test");
        }).then(null, (e: Error) => resolve(e));
      });
      
      expect(errorCaught.stack).toContain("From previous event:");
    } finally {
      Q.longStackSupport = false;
    }
  });
});