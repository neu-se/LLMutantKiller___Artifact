import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q environment detection", () => {
  it("throws descriptive error in unknown environment (no window, no self, no CommonJS)", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );
    
    // Create a context with no CommonJS, no window, no self
    const ctx = vm.createContext({});
    
    expect(() => vm.runInContext(qSource, ctx)).toThrow(
      "This environment was not anticipated by Q. Please file a bug."
    );
  });
});