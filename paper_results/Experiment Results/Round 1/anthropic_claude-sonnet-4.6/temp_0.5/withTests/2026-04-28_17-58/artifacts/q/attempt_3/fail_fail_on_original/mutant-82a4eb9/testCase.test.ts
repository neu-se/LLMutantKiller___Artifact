import { runInNewContext } from "vm";
import { readFileSync } from "fs";
import { join } from "path";

describe("Q module loading condition", () => {
  it("should fall through to the anticipated environment error when exports is object but module is not", () => {
    const qSource = readFileSync(
      join(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    const context: Record<string, unknown> = {
      exports: {},
      module: null,
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