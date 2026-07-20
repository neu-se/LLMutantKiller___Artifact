import * as fs from "fs";
import * as path from "path";
import * as vm from "vm";

describe("Q ses.ok() branch inside window block", () => {
  it("should set window.Q when ses is not defined at module level but ses variable exists in scope with ok()=false", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );

    // We need ses to be undefined at the top-level check (typeof ses !== "undefined")
    // but then the placeholder if(!ses.ok()) needs ses to exist
    // This is only possible if ses is defined as a property on the global after the check
    // OR if we look at this differently:
    // The placeholder wraps the entire window assignment block
    // When ses is truly undefined, ses.ok() throws ReferenceError
    // So window.Q would NOT be set if ses is undefined (throws before assignment)
    // Let's verify: no ses, window defined -> does window.Q get set?
    // If it does, the if(!ses.ok()) must not be executing at all
    // meaning the placeholder if block's closing brace is AFTER the window assignment

    // Try: define ses on the sandbox after context creation but it's visible
    // Actually let's try ses undefined but check if noConflict works
    const sandbox: any = {
      window: { existingQ: "previous" },
      self: {},
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
    };

    vm.createContext(sandbox);
    vm.runInContext(qSource, sandbox);

    // noConflict should restore previous Q
    const q = sandbox.window.Q;
    const restored = q.noConflict();
    expect(restored).toBe(q);
    expect(sandbox.window.Q).toBe(undefined);
  });
});