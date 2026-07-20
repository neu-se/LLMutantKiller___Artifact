import { createRequire } from "module";
import { fileURLToPath } from "url";
import * as path from "path";

describe("ses environment behavior", () => {
  it("should not set ses.makeQ when ses.ok() returns false", () => {
    // We need to simulate the ses environment
    // The module checks: typeof ses !== "undefined" and then ses.ok()
    // If ses.ok() returns false, original code returns early (makeQ not set)
    // Mutated code would still set makeQ even when ses.ok() returns false
    
    const sesObj: { ok: () => boolean; makeQ?: Function } = {
      ok: () => false
    };
    
    // We need to inject `ses` as a global before the module loads
    // Use a fresh module evaluation via vm
    const vm = require("vm");
    const fs = require("fs");
    const modulePath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const code = fs.readFileSync(modulePath, "utf-8");
    
    const context = vm.createContext({
      ses: sesObj,
      // No exports/module/define/window/self to force the ses branch
    });
    
    vm.runInContext(code, context);
    
    // In the original code: ses.ok() returns false -> return early -> ses.makeQ NOT set
    // In the mutated code: ses.ok() returns false -> falls to else -> ses.makeQ IS set
    expect(sesObj.makeQ).toBeUndefined();
  });
});