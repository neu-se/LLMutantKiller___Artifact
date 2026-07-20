import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q browser global path", () => {
  it("should set Q on the global window object when loaded as a script in a browser-like environment", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    const sandbox: Record<string, unknown> = {
      window: {} as Record<string, unknown>,
    };

    // No `module`, no `exports`, no `define`, no `ses`, no `bootstrap`
    // but `window` is defined — this triggers the browser global path
    vm.createContext(sandbox);
    vm.runInContext(qSource, sandbox);

    // In the original code, window.Q should be set to the Q function
    // In the mutated code (else if (false)), it falls through to throw new Error(...)
    expect(typeof (sandbox.window as Record<string, unknown>).Q).toBe("function");
  });
});