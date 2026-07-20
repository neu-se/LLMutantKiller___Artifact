import * as fs from "fs";
import * as path from "path";

describe("ses environment handling", () => {
  it("should assign definition to ses.makeQ when ses is defined and ses.ok() returns true", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = fs.readFileSync(qPath, "utf8");

    // We'll wrap the module source so we can inject our own environment
    // by replacing the IIFE invocation pattern
    const fakeSes = {
      ok: () => true,
      makeQ: undefined as any,
    };

    // Create a sandboxed environment where:
    // - bootstrap is undefined
    // - module is undefined (no CommonJS)
    // - define is undefined (no AMD)
    // - ses IS defined with ok() = true
    // - window/self are undefined
    const sandboxEnv = {
      ses: fakeSes,
      bootstrap: undefined as any,
      module: undefined as any,
      define: undefined as any,
      window: undefined as any,
      self: undefined as any,
      process: process,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      setImmediate: setImmediate,
      MessageChannel: undefined as any,
      ReturnValue: undefined as any,
      StopIteration: undefined as any,
      console: console,
    };

    const keys = Object.keys(sandboxEnv);
    const values = keys.map((k) => (sandboxEnv as any)[k]);

    // Wrap the source so it runs with our injected variables shadowing globals
    const wrappedSource = `(function(${keys.join(",")}) { ${qSource} })`;

    // eslint-disable-next-line no-eval
    const fn = eval(wrappedSource);
    fn(...values);

    // Original: ses.ok() returns true → ses.makeQ = definition (a function)
    // Mutated:  ses block is empty → ses.makeQ remains undefined
    expect(typeof fakeSes.makeQ).toBe("function");
  });
});