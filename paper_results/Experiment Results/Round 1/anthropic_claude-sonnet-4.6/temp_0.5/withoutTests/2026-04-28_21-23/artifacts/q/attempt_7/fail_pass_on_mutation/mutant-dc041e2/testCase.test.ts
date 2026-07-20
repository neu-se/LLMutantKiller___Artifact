import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q module loading with ses.ok() returning true", () => {
  it("should NOT set Q on window when ses is defined and ses.ok() returns true (original behavior)", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    const mockWindow: any = {};
    const sandbox: any = {
      ses: { ok: () => true },
      window: mockWindow,
      setTimeout,
      clearTimeout,
      setImmediate,
      console,
      process,
    };

    vm.createContext(sandbox);
    vm.runInContext(qSource, sandbox);

    // Original: ses branch fires (empty), window branch skipped entirely
    // So Q is never set on window
    expect(mockWindow.Q).toBeUndefined();
  });
});