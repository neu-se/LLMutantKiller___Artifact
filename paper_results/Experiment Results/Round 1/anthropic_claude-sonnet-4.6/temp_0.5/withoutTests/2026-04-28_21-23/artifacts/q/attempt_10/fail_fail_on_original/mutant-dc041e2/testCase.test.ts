import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q module loading", () => {
  it("should set Q on window when ses is defined with ok()=false and window is present", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    const mockWindow: any = {};
    // ses defined (so ses branch fires), ok() returns false
    // Original: if (!ses.ok()) = if (!false) = if(true) -> sets up Q on window
    // Mutated:  if (ses.ok())  = if (false)             -> skips Q setup
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

    expect(mockWindow.Q).toBeDefined();
    expect(typeof mockWindow.Q).toBe("function");
  });
});