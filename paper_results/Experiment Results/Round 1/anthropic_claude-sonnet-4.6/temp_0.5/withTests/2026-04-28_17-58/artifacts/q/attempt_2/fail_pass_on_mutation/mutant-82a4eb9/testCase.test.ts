import { runInNewContext } from "vm";
import { readFileSync } from "fs";
import { join } from "path";

describe("Q module loading condition", () => {
  it("should only use module.exports branch when both exports and module are objects, not when only exports is an object", () => {
    const qSource = readFileSync(
      join(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    // Simulate environment where exports is an object but module is NOT an object
    // Original (&&): should NOT enter the CommonJS branch, fall through to other branches
    // Mutated (||): WOULD enter the CommonJS branch because exports is an object
    
    const context: Record<string, unknown> = {
      exports: {},       // exports IS an object
      module: undefined, // module is NOT an object
      define: undefined,
      ses: undefined,
      window: undefined,
      self: undefined,
      process: undefined,
      setImmediate: undefined,
      MessageChannel: undefined,
      setTimeout: (fn: () => void) => fn(),
    };

    expect(() => {
      runInNewContext(qSource, context);
    }).toThrow(); // Should throw "This environment was not anticipated by Q"
    // because with &&, neither CommonJS nor other branches match,
    // so it falls to the final throw.
    // With ||, it enters the CommonJS branch and does NOT throw.
  });
});