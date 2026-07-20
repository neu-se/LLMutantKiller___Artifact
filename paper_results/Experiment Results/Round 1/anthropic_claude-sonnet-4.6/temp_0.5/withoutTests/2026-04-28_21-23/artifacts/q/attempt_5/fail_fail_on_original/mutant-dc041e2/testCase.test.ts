import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q module loading with ses.ok() returning false", () => {
  it("should set Q on window when ses is defined but ses.ok() returns false", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    const mockWindow: any = {};
    // ses is defined but ok() returns false
    // In original: if (!ses.ok()) => if (!false) => true => enters window setup block
    // In mutated:  if (ses.ok())  => if (false)  => false => skips window setup block
    const sandbox: any = {
      ses: { ok: () => false },
      window: mockWindow,
      setTimeout,
      clearTimeout,
      setImmediate,
      console,
      process,
    };

    vm.createContext(sandbox);
    vm.runInContext(qSource, sandbox);

    // Original: Q should be set on window
    // Mutated: Q should NOT be set on window
    expect(mockWindow.Q).toBeDefined();
    expect(typeof mockWindow.Q).toBe("function");
  });
});