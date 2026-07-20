import { createRequire } from "module";
import { Module } from "module";

describe("Q bootstrap detection", () => {
  it("should call bootstrap function when bootstrap is defined as a function", () => {
    // Set up a mock bootstrap function in global scope
    let bootstrapCalled = false;
    let bootstrapArgs: any[] = [];
    
    (global as any).bootstrap = function(name: string, definition: Function) {
      bootstrapCalled = true;
      bootstrapArgs = [name, definition];
    };

    // Clear require cache to force re-evaluation
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    
    try {
      require("../../../../../../../../../../../subject_repositories/q/q.js");
      // In original code, bootstrap should be called
      expect(bootstrapCalled).toBe(true);
      expect(bootstrapArgs[0]).toBe("promise");
    } finally {
      delete (global as any).bootstrap;
      delete require.cache[modulePath];
    }
  });
});