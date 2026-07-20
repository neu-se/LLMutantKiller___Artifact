import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q ses branch", () => {
  it("should call ses.ok and set Q on window when ses.ok() returns true", () => {
    const qSource = fs.readFileSync(
      path.join(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    const fakeWindow: Record<string, unknown> = {};
    let sesOkCalled = false;
    let sesOkReturnValue = true;

    const sandbox: Record<string, unknown> = {
      ses: {
        ok: () => {
          sesOkCalled = true;
          return sesOkReturnValue;
        }
      },
      window: fakeWindow,
      self: fakeWindow,
      console,
      setTimeout,
      clearTimeout,
      setImmediate,
    };

    const context = vm.createContext(sandbox);
    vm.runInContext(qSource, context);

    // Verify ses.ok was actually called (proves we reached the ses branch)
    expect(sesOkCalled).toBe(true);

    // Now figure out what the actual structure is by checking what happened
    // If Q was set on fakeWindow, the window block ran
    // If Q was not set, the window block did not run
    
    // Original with ses.ok()=true: if (!ses.ok()) => !true=false => skips => window block runs => Q set
    // Mutated with ses.ok()=true:  if (ses.ok())  => true=true  => enters empty block => Q NOT set
    expect(fakeWindow["Q"]).toBeDefined();
  });
});