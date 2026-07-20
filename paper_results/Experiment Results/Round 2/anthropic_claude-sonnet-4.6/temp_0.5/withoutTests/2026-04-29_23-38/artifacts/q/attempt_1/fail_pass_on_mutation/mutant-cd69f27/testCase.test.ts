import { createRequire } from "module";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import vm from "vm";
import path from "path";

describe("ses.ok() false behavior", () => {
  it("should not set ses.makeQ when ses.ok() returns false", () => {
    // Read the q.js file
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = readFileSync(qPath, "utf-8");

    // Create a fake ses object where ok() returns false
    const ses = {
      ok: () => false,
      makeQ: undefined as any,
    };

    // Create a sandbox that mimics the SES environment
    // We need to make sure the ses branch is taken
    const sandbox = {
      ses,
      // Make sure other module detection fails so we fall through to ses branch
      exports: undefined,
      module: undefined,
      define: undefined,
      bootstrap: undefined,
      window: undefined,
      self: undefined,
      console,
      setTimeout,
      clearTimeout,
      setImmediate,
      process,
      MessageChannel: (global as any).MessageChannel,
    };

    const script = new vm.Script(qSource);
    const context = vm.createContext(sandbox);
    
    script.runInContext(context);

    // In original code: ses.ok() returns false -> early return -> ses.makeQ is NOT set
    // In mutated code: ses.ok() returns false -> no return -> else runs -> ses.makeQ IS set
    expect(ses.makeQ).toBeUndefined();
  });
});