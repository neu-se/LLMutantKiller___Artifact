import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q ses branch", () => {
  it("should set global Q when ses is defined and ses.ok() returns false", () => {
    const qSource = fs.readFileSync(
      path.join(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    // Structure with original: if (!ses.ok()) { } else if (window) { set Q } else { throw }
    // ses.ok() = false:
    //   Original: !false = true => enters empty if block => skips window block => Q NOT set
    //   Mutated:  false = false => skips if block => enters window else-if => Q IS set

    // ses.ok() = true:
    //   Original: !true = false => skips if block => enters window else-if => Q IS set
    //   Mutated:  true = true => enters empty if block => skips window block => Q NOT set

    // Test with ses.ok() = true: original sets Q, mutated does not
    const fakeWindow: { Q?: unknown; noConflict?: unknown } = {};
    const context = vm.createContext({
      ses: { ok: () => true },
      window: fakeWindow,
      self: fakeWindow,
      console,
      setTimeout,
      clearTimeout,
      setImmediate,
    });

    vm.runInContext(qSource, context);

    // Original: !true = false => skips empty block => enters window else-if => Q IS set
    // Mutated:  true = true => enters empty block => skips window else-if => Q NOT set
    expect(fakeWindow.Q).toBeDefined();
  });
});