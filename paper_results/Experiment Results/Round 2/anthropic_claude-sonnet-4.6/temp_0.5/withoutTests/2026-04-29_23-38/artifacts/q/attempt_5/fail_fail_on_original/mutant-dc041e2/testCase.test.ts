import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q ses branch", () => {
  it("should set global Q when ses is defined and ses.ok() returns false (original) vs not set (mutated)", () => {
    const qSource = fs.readFileSync(
      path.join(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    const fakeWindow: { Q?: unknown; noConflict?: unknown } = {};
    
    // Create a clean context without CommonJS globals so the ses branch is reached
    const context = vm.createContext({
      // No 'exports', no 'module', no 'define', no 'bootstrap'
      // so the code falls through to the ses branch
      ses: { ok: () => false },
      window: fakeWindow,
      self: fakeWindow,
      console,
      setTimeout,
      clearTimeout,
      setImmediate,
      process: undefined,
    });

    vm.runInContext(qSource, context);

    // Original: if (!ses.ok()) with ses.ok()=false => !false=true => enters empty block
    //   => window else-if is skipped => Q NOT set on fakeWindow
    // Mutated: if (ses.ok()) with ses.ok()=false => false => skips block
    //   => falls to window else-if => Q IS set on fakeWindow

    // With ses.ok()=true:
    // Original: !true=false => skips empty block => enters window else-if => Q IS set
    // Mutated: true=true => enters empty block => skips window else-if => Q NOT set

    // Use ses.ok()=true so original sets Q and mutated does not
    const fakeWindow2: { Q?: unknown; noConflict?: unknown } = {};
    const context2 = vm.createContext({
      ses: { ok: () => true },
      window: fakeWindow2,
      self: fakeWindow2,
      console,
      setTimeout,
      clearTimeout,
      setImmediate,
      process: undefined,
    });

    vm.runInContext(qSource, context2);

    // Original: !true=false => enters window else-if => Q IS set
    // Mutated: true=true => enters empty block => Q NOT set
    expect(fakeWindow2.Q).toBeDefined();
  });
});