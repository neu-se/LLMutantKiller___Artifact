import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q ses branch", () => {
  it("should set Q on the global object when ses is defined and ses.ok() returns true", () => {
    const qSource = fs.readFileSync(
      path.join(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    // When window is defined in the sandbox, the code does:
    //   var global = typeof window !== "undefined" ? window : self;
    //   global.Q = definition();
    // But 'window' here refers to the sandbox's window property (fakeWindow),
    // so global.Q should be set on fakeWindow.
    // UNLESS the vm context's own global object is what 'window' resolves to.
    
    // Let's check the context's global object directly
    const sandbox: Record<string, unknown> = {
      ses: { ok: () => true },
      console,
      setTimeout,
      clearTimeout,
      setImmediate,
    };
    // Set window = the sandbox itself so global.Q gets set on sandbox
    sandbox["window"] = sandbox;
    sandbox["self"] = sandbox;

    const context = vm.createContext(sandbox);
    vm.runInContext(qSource, context);

    // Original with ses.ok()=true: !true=false => skips empty block => window else-if runs => Q set on sandbox
    // Mutated with ses.ok()=true:  true=true  => enters empty block => window else-if skipped => Q NOT set
    expect(sandbox["Q"]).toBeDefined();
  });
});