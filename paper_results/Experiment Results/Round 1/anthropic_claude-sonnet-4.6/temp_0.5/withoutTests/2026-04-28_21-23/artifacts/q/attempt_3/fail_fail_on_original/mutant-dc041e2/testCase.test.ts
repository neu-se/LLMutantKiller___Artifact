import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q module loading with ses environment", () => {
  it("should initialize Q on global when ses.ok() returns false and window is defined", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    const sandbox: any = {
      ses: { ok: () => false },
      self: {},
      Q: undefined,
      setTimeout,
      clearTimeout,
      setImmediate,
    };

    vm.createContext(sandbox);
    vm.runInContext(qSource, sandbox);

    expect(sandbox.self.Q).toBeDefined();
    expect(typeof sandbox.self.Q).toBe("function");
  });
});