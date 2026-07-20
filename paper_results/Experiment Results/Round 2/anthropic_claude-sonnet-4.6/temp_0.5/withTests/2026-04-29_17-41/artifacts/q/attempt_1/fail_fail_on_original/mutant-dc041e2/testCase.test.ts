import * as fs from "fs";
import * as path from "path";
import * as vm from "vm";

describe("Q ses branch behavior", () => {
  it("should not initialize Q on global when ses.ok() returns true", () => {
    const qSource = fs.readFileSync(path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"), "utf8");
    
    const sandbox: any = {
      ses: { ok: () => true },
      window: { Q: undefined as any },
      self: {},
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      process: undefined,
      setImmediate: undefined,
      MessageChannel: undefined,
    };
    
    vm.createContext(sandbox);
    vm.runInContext(qSource, sandbox);
    
    // In original: if (!ses.ok()) { ... } else if (window) { window.Q = definition() }
    // ses.ok() returns true, so !ses.ok() is false, so we skip the empty block
    // and fall through to the else-if(window) block -> window.Q gets set
    // In mutated: if (ses.ok()) { ... } else if (window) { window.Q = definition() }
    // ses.ok() returns true, so we enter the empty block, skip else-if -> window.Q NOT set
    expect(sandbox.window.Q).toBeDefined();
  });
});