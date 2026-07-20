import { runInNewContext } from "vm";
import { readFileSync } from "fs";
import { join } from "path";

describe("Q module loading condition", () => {
  it("should not enter CommonJS branch when module is not an object even if exports is", () => {
    const qSource = readFileSync(
      join(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    // exports is an object, but module is a string (typeof === "string", not "object")
    // Original (&&): false → skips CommonJS branch → throws "not anticipated"
    // Mutated (||): true → enters CommonJS branch → tries string.exports = ... → no throw, or different behavior
    const context: Record<string, unknown> = {
      exports: {},
      module: "not-an-object",
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
    }).toThrow("This environment was not anticipated by Q");
  });
});