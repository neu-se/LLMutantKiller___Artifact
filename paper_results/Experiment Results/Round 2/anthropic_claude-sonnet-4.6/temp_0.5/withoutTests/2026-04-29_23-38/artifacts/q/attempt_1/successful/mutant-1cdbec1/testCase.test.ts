import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q browser environment detection", () => {
  it("should initialize Q when only self is defined (not window)", () => {
    // Read the Q source file
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    // Create a context where only `self` is defined (not `window`)
    // This simulates a non-windowed browser context (e.g., Web Worker)
    const context: Record<string, unknown> = {
      self: {},
      // No `window` defined
    };

    vm.createContext(context);

    // In original code (||): window undefined, self defined → branch executes → Q is set on self
    // In mutated code (&&): window undefined, self defined → condition false → falls to throw Error
    let error: Error | null = null;
    try {
      vm.runInContext(qSource, context);
    } catch (e) {
      error = e as Error;
    }

    // Original code should NOT throw; mutated code WILL throw
    expect(error).toBeNull();
    // Also verify Q was set on the self object
    expect((context.self as Record<string, unknown>).Q).toBeDefined();
  });
});