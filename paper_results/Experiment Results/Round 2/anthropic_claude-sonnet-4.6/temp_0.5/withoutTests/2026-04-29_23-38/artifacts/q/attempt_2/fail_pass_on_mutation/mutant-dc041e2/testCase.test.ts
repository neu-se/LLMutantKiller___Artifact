import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q ses branch", () => {
  it("should not set global Q when ses is defined with ses.ok() returning false", () => {
    const qSource = fs.readFileSync(
      path.join(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    // Create a context where:
    // - ses is defined with ok() returning false
    // - window is defined so we can detect if the window block runs
    // In original code: if (!ses.ok()) => if (!false) => true => enters empty ses block
    //   => the else-if chain is done, window block is skipped
    // In mutated code: if (ses.ok()) => if (false) => false => skips ses block
    //   => falls through to window/self block => sets global.Q
    const fakeWindow: { Q?: unknown; previousQ?: unknown } = {};
    const context = vm.createContext({
      ses: {
        ok: () => false
      },
      window: fakeWindow,
      self: fakeWindow,
      console,
      setTimeout,
      clearTimeout,
      setImmediate,
    });

    vm.runInContext(qSource, context);

    // In original code: ses.ok() returns false, !ses.ok() is true,
    //   enters empty ses block, skips window block => fakeWindow.Q is NOT set
    // In mutated code: ses.ok() returns false, ses.ok() is false,
    //   skips ses block, enters window block => fakeWindow.Q IS set
    expect(fakeWindow.Q).toBeUndefined();
  });
});