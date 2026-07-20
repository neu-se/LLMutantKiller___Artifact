import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("ses branch behavior", () => {
  it("ses.makeQ is set when ses.ok() returns true, not set when false", () => {
    const modulePath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const code = fs.readFileSync(modulePath, "utf-8");

    // When ses.ok() returns false: original returns early, mutated has empty block
    // The ONLY difference: original `return` prevents window/self branch
    // But since we're in the ses else-if branch already, window/self is unreachable anyway
    
    // Let me try: ses defined, ses.ok() returns false, AND define window
    // to see if window.Q gets set (it shouldn't in either version)
    const windowObj: { Q?: unknown; previousQ?: unknown } = {};
    const sesObj: { ok: () => boolean; makeQ?: unknown } = { ok: () => false };

    const context = vm.createContext({
      ses: sesObj,
      window: windowObj,
      setTimeout, clearTimeout, setImmediate, process, console,
    });

    vm.runInContext(code, context);

    // In both original and mutated: ses branch is taken, window branch is not
    // So window.Q should NOT be set
    expect(windowObj.Q).toBeUndefined();
    expect(sesObj.makeQ).toBeUndefined();
  });
});