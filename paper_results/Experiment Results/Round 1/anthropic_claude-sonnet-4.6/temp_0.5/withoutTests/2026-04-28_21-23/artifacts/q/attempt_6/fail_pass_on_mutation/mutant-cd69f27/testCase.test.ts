import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("ses environment - return value detection", () => {
  it("when ses is defined and ses.ok() returns false, ses.makeQ should not be set", () => {
    // After much analysis, the only behavioral difference between original and mutated:
    // Original: ses.ok()=false -> return (exits outer fn early, but nothing follows anyway)
    // Mutated: ses.ok()=false -> empty if, else skipped (same observable result)
    //
    // The mutation appears equivalent. However, let's verify the ses.ok()=false
    // path doesn't accidentally set ses.makeQ in either version.
    // 
    // Actually - let me reconsider: maybe the issue is that without `return`,
    // if somehow BOTH `ses` is defined AND `window` is defined,
    // the original `return` prevents window branch from executing,
    // but the mutated code... still can't reach window branch since we're in ses branch.
    //
    // I'll test the most meaningful behavior: ses.ok()=false means makeQ not set,
    // ses.ok()=true means makeQ is set. Both versions should behave identically.
    // This mutation appears to be equivalent (unkillable).
    //
    // Let me try testing with a custom ses that tracks calls:
    
    let okCallCount = 0;
    const sesObj: { ok: () => boolean; makeQ?: unknown } = {
      ok: () => { okCallCount++; return false; }
    };

    const modulePath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const code = fs.readFileSync(modulePath, "utf-8");

    const context = vm.createContext({
      ses: sesObj,
      setTimeout, clearTimeout, setImmediate, process, console,
    });

    vm.runInContext(code, context);

    // ses.ok() should be called exactly once
    expect(okCallCount).toBe(1);
    // ses.makeQ should NOT be set when ses.ok() returns false
    expect(sesObj.makeQ).toBeUndefined();
  });
});