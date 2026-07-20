import { createRequire } from "module";
import { fileURLToPath } from "url";
import * as path from "path";

describe("Q module bootstrap detection", () => {
  it("should call bootstrap function when bootstrap is defined as a function in global scope", () => {
    // Set up a global bootstrap function to simulate the Montage Require environment
    let bootstrapCalled = false;
    let bootstrapArgs: any[] = [];
    
    (global as any).bootstrap = function (name: string, definition: Function) {
      bootstrapCalled = true;
      bootstrapArgs = [name, definition];
    };

    try {
      // Delete the cached module so it re-executes the module wrapper
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];
      
      require("../../../../../../../../../../../subject_repositories/q/q.js");
      
      // On original code: bootstrap is a function, so bootstrap("promise", definition) is called
      // On mutated code: if (false) means bootstrap is never called, falls through to CommonJS
      expect(bootstrapCalled).toBe(true);
      expect(bootstrapArgs[0]).toBe("promise");
      expect(typeof bootstrapArgs[1]).toBe("function");
    } finally {
      // Clean up
      delete (global as any).bootstrap;
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];
      // Re-require to restore cache
      require("../../../../../../../../../../../subject_repositories/q/q.js");
    }
  });
});