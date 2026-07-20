import * as fs from "fs";
import * as vm from "vm";
import * as Module from "module";

describe("crawler-url-parser result_normalize_options", () => {
  it("should have stripWWW set to true", () => {
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
    const code = fs.readFileSync(modulePath, "utf-8");
    
    // Create a sandbox that captures the internal result_normalize_options
    const sandbox: any = {
      require: require,
      module: { exports: {}, parent: true },
      exports: {},
      __filename: modulePath,
      __dirname: require("path").dirname(modulePath),
      console: console,
      result_normalize_options: undefined
    };
    
    // Wrap code to expose internal variable
    const wrappedCode = `
      ${code}
      sandbox.result_normalize_options = result_normalize_options;
    `;
    
    vm.runInNewContext(wrappedCode, { sandbox, require, module: sandbox.module, exports: sandbox.exports, __filename: modulePath, __dirname: require("path").dirname(modulePath), console });
    
    expect(sandbox.result_normalize_options).toBeDefined();
    expect(sandbox.result_normalize_options.stripWWW).toBe(true);
  });
});