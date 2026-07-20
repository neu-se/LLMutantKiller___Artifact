import * as fs from "fs";
import * as path from "path";
import * as vm from "vm";

describe("Q ses branch behavior", () => {
  it("should set window.Q when ses is defined and ses.ok() returns true", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );

    const sandbox: any = {
      ses: { ok: () => true },
      window: {},
      self: {},
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
    };

    vm.createContext(sandbox);
    vm.runInContext(qSource, sandbox);

    // Original: if (!ses.ok()) {} else if (window) { window.Q = definition() }
    // ses.ok() = true => !ses.ok() = false => skip empty block => fall to else-if(window) => window.Q set
    // Mutated: if (ses.ok()) {} else if (window) { window.Q = definition() }
    // ses.ok() = true => enter empty block => skip else-if => window.Q NOT set
    expect(sandbox.window.Q).toBeDefined();
    expect(typeof sandbox.window.Q).toBe("function");
  });
});