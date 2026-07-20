// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_4/pending_category/mutant-1cdbec1/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q global initialization", () => {
  it("should initialize Q globally when only window is defined", () => {
    // Save the original global state
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;
    const originalQ = (global as any).Q;

    // Clear any existing Q global
    delete (global as any).Q;

    // Create a mock environment where only window is defined
    (global as any).window = {};
    delete (global as any).self;

    // Load Q in this environment by evaluating the module code
    const Module = require('module');
    const originalRequire = Module.prototype.require;
    Module.prototype.require = function(id: string) {
      if (id === "../../../../../../../../../../../subject_repositories/q/q.js") {
        // Execute the module code in the current context
        const fs = require('fs');
        const path = require('path');
        const modulePath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
        const code = fs.readFileSync(modulePath, 'utf8');
        const module = { exports: {} };
        const moduleFunc = new Function('module', 'exports', 'require', '__filename', '__dirname', code);
        moduleFunc(module, module.exports, originalRequire, modulePath, path.dirname(modulePath));
        return module.exports;
      }
      return originalRequire.apply(this, arguments);
    };

    // Load Q in this environment
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q was initialized globally
    expect((global as any).Q).toBeDefined();

    // Restore original global state
    (global as any).window = originalWindow;
    (global as any).self = originalSelf;
    (global as any).Q = originalQ;
    Module.prototype.require = originalRequire;
  });
});