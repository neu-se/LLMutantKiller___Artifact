import * as fs from "fs";
import * as path from "path";
import * as vm from "vm";

describe("Q window global assignment", () => {
  it("should set window.Q when ses is not defined and window is available", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );

    // No ses defined, no CommonJS exports, no RequireJS define
    // So we fall into the window/self branch
    const sandbox: any = {
      window: {},
      self: {},
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
    };

    vm.createContext(sandbox);
    vm.runInContext(qSource, sandbox);

    expect(sandbox.window.Q).toBeDefined();
    expect(typeof sandbox.window.Q).toBe("function");
    expect(typeof sandbox.window.Q.noConflict).toBe("function");
  });
});