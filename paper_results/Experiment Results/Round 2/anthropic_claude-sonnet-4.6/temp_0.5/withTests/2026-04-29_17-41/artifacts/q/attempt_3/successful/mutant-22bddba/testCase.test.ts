import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q module loading", () => {
  it("loads successfully and sets Q on window when window is defined but self is not", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );

    const fakeWindow: any = {};
    const sandbox: any = {
      window: fakeWindow,
      // self is intentionally not defined
    };

    vm.createContext(sandbox);
    vm.runInContext(qSource, sandbox);

    // Original: typeof window !== "undefined" is true => Q set on window
    // Mutated: false || typeof self !== "undefined" => false => throws Error
    expect(fakeWindow.Q).toBeDefined();
    expect(typeof fakeWindow.Q).toBe("function");
  });
});