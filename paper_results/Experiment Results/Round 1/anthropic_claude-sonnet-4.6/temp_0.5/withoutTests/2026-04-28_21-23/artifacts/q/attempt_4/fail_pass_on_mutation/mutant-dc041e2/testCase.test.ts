import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q module loading with ses environment", () => {
  it("should initialize Q on global when ses is undefined, ses.ok returns false, and self is defined", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    // We need: no exports/module (not CommonJS), no define (not RequireJS),
    // no ses (skip ses branch), but have self/window (enter window branch)
    // Then ses.ok() is called - but ses is undefined... 
    // Unless ses is defined in the outer scope somehow
    
    const mockSelf: any = {};
    const sandbox: any = {
      self: mockSelf,
      setTimeout,
      clearTimeout,
      setImmediate,
      console,
    };

    vm.createContext(sandbox);
    
    try {
      vm.runInContext(qSource, sandbox);
    } catch(e) {
      // ignore
    }

    expect(mockSelf.Q).toBeDefined();
  });
});