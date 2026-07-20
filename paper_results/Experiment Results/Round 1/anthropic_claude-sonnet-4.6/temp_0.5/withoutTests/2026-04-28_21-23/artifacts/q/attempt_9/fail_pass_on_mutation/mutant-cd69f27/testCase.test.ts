import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("ses.ok false - mutation detection", () => {
  it("when ses.ok returns false, ses.makeQ should not be set to definition", () => {
    const modulePath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const code = fs.readFileSync(modulePath, "utf-8");

    // Create a ses where ok() returns false initially, then true
    // This tests if the return statement prevents makeQ from being set
    // in a scenario where ok() might be called multiple times
    let callCount = 0;
    const sesObj: { ok: () => boolean; makeQ?: unknown } = {
      ok: () => {
        callCount++;
        // First call returns false (triggers the if branch)
        // If return is missing, execution might somehow reach makeQ assignment
        return callCount > 1; // false on first call
      }
    };

    const context = vm.createContext({
      ses: sesObj,
      setTimeout, clearTimeout, setImmediate, process, console,
    });

    vm.runInContext(code, context);

    // ses.ok() should only be called once
    expect(callCount).toBe(1);
    // makeQ should NOT be set since ses.ok() returned false
    expect(sesObj.makeQ).toBeUndefined();
  });
});