import { execSync } from "child_process";
import * as path from "path";
import * as vm from "vm";
import * as fs from "fs";

describe("Q ses branch behavior", () => {
  it("should set ses.makeQ when ses is defined and ses.ok() returns true", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );

    const ses = {
      ok: () => true,
      makeQ: null as any
    };

    // Create a context where CommonJS is NOT available but ses IS defined
    const context = vm.createContext({
      ses,
      // No 'module' object - forces non-CommonJS path
    });

    vm.runInContext(qSource, context);

    // In original: ses.makeQ should be set to the definition function
    // In mutated: ses branch is empty, so ses.makeQ remains null
    expect(ses.makeQ).not.toBeNull();
    expect(typeof ses.makeQ).toBe("function");
  });
});