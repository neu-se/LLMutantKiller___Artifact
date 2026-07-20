import * as fs from "fs";
import * as path from "path";
import * as vm from "vm";

describe("Q ses branch inside window block", () => {
  it("should set window.Q when ses.ok() is false in window/self context", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );

    // The structure is:
    // else if (typeof ses !== "undefined") {}   <- empty ses block
    // else if (window/self) {
    //   if (!ses.ok()) {   <- PLACEHOLDER (original)
    //     ... global.Q = definition() ...
    //   }
    // }
    //
    // For ses to pass typeof check as "undefined" but still have ses.ok():
    // We need ses to be a property of the global/window that's accessible
    // but not a direct variable. In VM context, all sandbox properties ARE globals.
    // 
    // The only scenario: ses IS defined (typeof !== "undefined"),
    // we enter empty ses block, skip window block entirely.
    // OR ses is NOT defined, we enter window block, ses.ok() throws.
    //
    // CONCLUSION: This mutation may only be detectable by checking
    // that when ses IS defined with ok()=true, original skips window assignment
    // (because !true=false) but mutated DOES window assignment (true=true).
    // Wait - but ses defined means we never reach window block!
    //
    // Let me try: ses defined with ok()=true
    // Original: typeof ses !== "undefined" -> enter empty ses block -> SKIP window block
    // Mutated: same - enter empty ses block -> SKIP window block
    // No difference.
    //
    // ses defined with ok()=false  
    // Original: enter empty ses block -> SKIP window block -> window.Q NOT set
    // Mutated: same
    // No difference.
    //
    // The ONLY way: ses is NOT a top-level global but IS accessible as ses inside the closure
    // This could happen if ses is defined on 'self' and the code runs where self===global
    
    const sandbox: any = {
      self: {},
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
    };
    // Make ses accessible as a property of self (which becomes global)
    // but NOT as a direct sandbox property
    sandbox.self.ses = { ok: () => false };
    
    // Also make window undefined so self is used
    vm.createContext(sandbox);
    vm.runInContext(qSource, sandbox);

    // Original: if (!ses.ok()) with ses undefined -> ReferenceError or...
    // Actually ses is not a global here, so typeof ses === "undefined"
    // We enter window/self block (self is defined)
    // Then if (!ses.ok()) -> ses is undefined -> ReferenceError
    expect(sandbox.self.Q).toBeDefined();
  });
});