import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("ses environment - early return behavior", () => {
  it("should not set ses.makeQ and not throw when ses.ok() returns false", () => {
    const sesObj: { ok: () => boolean; makeQ?: unknown } = {
      ok: () => false,
    };

    const modulePath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const code = fs.readFileSync(modulePath, "utf-8");

    // Explicitly exclude window, self, bootstrap, define to force the ses branch
    // Also exclude exports/module to avoid CommonJS branch
    const context = vm.createContext({
      ses: sesObj,
      setTimeout,
      clearTimeout,
      setImmediate,
      process,
      console,
      // window and self are intentionally NOT included
    });

    let threw = false;
    try {
      vm.runInContext(code, context);
    } catch (e) {
      threw = true;
    }

    // Original: ses.ok() false -> return early -> no throw, ses.makeQ not set
    // Mutated: ses.ok() false -> no return -> falls to else-if window/self -> throws error
    expect(threw).toBe(false);
    expect(sesObj.makeQ).toBeUndefined();
  });
});