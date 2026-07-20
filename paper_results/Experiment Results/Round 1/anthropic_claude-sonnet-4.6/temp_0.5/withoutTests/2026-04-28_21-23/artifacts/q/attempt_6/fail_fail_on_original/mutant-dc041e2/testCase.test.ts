import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q module loading", () => {
  it("should throw when ses is undefined but window is defined (ses.ok() called on undefined)", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    const mockWindow: any = {};
    const sandbox: any = {
      window: mockWindow,
      setTimeout,
      clearTimeout,
      setImmediate,
      console,
      process,
    };

    vm.createContext(sandbox);
    
    expect(() => vm.runInContext(qSource, sandbox)).toThrow();
  });
});