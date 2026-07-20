import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q module environment detection", () => {
  it("throws expected error when no module system is available", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    // Create a context with no module system (no exports, module, define, ses, window, self)
    const context = vm.createContext({
      setTimeout,
      clearTimeout,
      setImmediate,
      process,
      console,
    });

    expect(() => {
      vm.runInContext(qSource, context);
    }).toThrow("This environment was not anticipated by Q. Please file a bug.");
  });
});