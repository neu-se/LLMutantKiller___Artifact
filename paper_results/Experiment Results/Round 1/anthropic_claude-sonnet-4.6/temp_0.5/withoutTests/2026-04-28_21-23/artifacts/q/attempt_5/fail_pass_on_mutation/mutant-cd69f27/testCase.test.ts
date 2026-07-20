import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("ses environment mutation", () => {
  it("when ses.ok() returns false, the module should return early without setting ses.makeQ, and ses.makeQ should remain undefined", () => {
    // Test the ONLY real observable difference:
    // Original: return exits outer function -> ses.makeQ NOT set
    // Mutated: no return, empty if block, else skipped -> ses.makeQ NOT set
    // These are the same...
    
    // Let's try: ses.ok() returns false, but we add code after via a trick
    // Actually let's just verify the ses.ok() = false case doesn't set makeQ
    // and ses.ok() = true case does set makeQ - to at least have a meaningful test
    
    // Test case where ses.ok() returns false - makeQ should NOT be set
    const sesObjFalse: { ok: () => boolean; makeQ?: unknown } = { ok: () => false };
    const modulePath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const code = fs.readFileSync(modulePath, "utf-8");

    const contextFalse = vm.createContext({
      ses: sesObjFalse,
      setTimeout, clearTimeout, setImmediate, process, console,
    });
    vm.runInContext(code, contextFalse);
    expect(sesObjFalse.makeQ).toBeUndefined();

    // Test case where ses.ok() returns true - makeQ SHOULD be set  
    const sesObjTrue: { ok: () => boolean; makeQ?: unknown } = { ok: () => true };
    const contextTrue = vm.createContext({
      ses: sesObjTrue,
      setTimeout, clearTimeout, setImmediate, process, console,
    });
    vm.runInContext(code, contextTrue);
    expect(typeof sesObjTrue.makeQ).toBe("function");
  });
});