import { execSync } from "child_process";
import { writeFileSync, unlinkSync } from "fs";
import { join } from "path";

describe("Q module loading condition", () => {
  it("should not crash when exports is object but module is not, falling through to next condition", () => {
    // Create a temporary script that simulates an environment where
    // exports is an object but module is not an object
    const script = `
      const originalModule = global.module;
      // Simulate environment where module is not an object (e.g., undefined)
      // but exports is an object - the || mutation would enter the branch
      // and crash on module.exports = ..., while && correctly skips it
      const vm = require('vm');
      const fs = require('fs');
      const code = fs.readFileSync(require.resolve('./q.js'), 'utf8');
      
      const fakeExports = {};
      const context = vm.createContext({
        exports: fakeExports,
        module: "not an object",  // module is a string, not object
        define: undefined,
        ses: undefined,
        window: undefined,
        self: undefined,
        bootstrap: undefined,
        process: process,
        setTimeout: setTimeout,
        clearTimeout: clearTimeout,
        setImmediate: setImmediate,
        console: console,
        Error: Error,
        TypeError: TypeError,
        Object: Object,
        Array: Array,
        Function: Function,
        Math: Math,
        JSON: JSON,
        ReturnValue: undefined,
        MessageChannel: undefined,
      });
      
      try {
        vm.runInContext(code, context);
        // With && (original): module is "not an object", so condition is false,
        // falls through to other conditions, eventually throws since no valid env
        // With || (mutated): exports IS an object, so enters branch,
        // tries module.exports = ... which sets property on string (no-op or error)
        console.log('completed');
      } catch(e) {
        console.log('error: ' + e.message);
      }
    `;
    
    writeFileSync("/tmp/test_q_mutation.js", script);
    try {
      const result = execSync("node /tmp/test_q_mutation.js", { 
        cwd: process.cwd(),
        encoding: "utf8" 
      });
      // Original: falls through all conditions and throws "not anticipated" error
      // which we catch and print "error: This environment was not anticipated..."
      expect(result).toContain("error:");
      expect(result).not.toContain("completed");
    } finally {
      unlinkSync("/tmp/test_q_mutation.js");
    }
  });
});