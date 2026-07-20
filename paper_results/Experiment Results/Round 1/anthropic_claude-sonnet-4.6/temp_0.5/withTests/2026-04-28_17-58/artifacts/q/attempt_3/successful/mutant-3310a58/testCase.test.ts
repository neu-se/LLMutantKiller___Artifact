import vm from "vm";
import fs from "fs";
import path from "path";

describe("Q module initialization without process", () => {
  it("should load without throwing when process is not available in the environment", () => {
    const qPath = path.resolve(
      __dirname,
      "../../../../../../../../../../../subject_repositories/q/q.js"
    );
    const code = fs.readFileSync(qPath, "utf-8");

    const moduleExports: any = {};
    const fakeModule = { exports: moduleExports };

    // Create a context WITHOUT process defined
    // Original code: typeof process === "object" safely returns false, no throw
    // Mutated code: true && process.env throws ReferenceError (process not defined)
    const context = vm.createContext({
      exports: moduleExports,
      module: fakeModule,
      setTimeout,
      setImmediate,
      clearTimeout,
      MessageChannel: (global as any).MessageChannel,
    });

    let threw = false;
    let thrownError: any = null;
    try {
      vm.runInContext(code, context);
    } catch (e) {
      threw = true;
      thrownError = e;
    }

    expect(threw).toBe(false);
  });
});