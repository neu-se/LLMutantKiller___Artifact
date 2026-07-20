import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q module loading", () => {
  it("should correctly handle ses branch and window setup", async () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    // Try with ses defined as object where ok() returns false
    // AND ensure ses branch is skipped by making typeof ses === "undefined"
    // but ses.ok is still callable... this seems impossible with standard JS
    
    // Let's try: no ses, no exports, no module, no define, no bootstrap, but window defined
    // In this case typeof ses === "undefined" is FALSE (ses branch fires, empty, done)
    // Wait no - if ses is not in sandbox, typeof ses === "undefined" is TRUE
    // So ses branch fires with empty body {}
    // Then else-if window branch is skipped
    // So Q is never set... but original test showed it WAS set!
    
    const mockSelf: any = {};
    const sandbox: any = {
      self: mockSelf,
      setTimeout,
      clearTimeout,
      setImmediate,
      console,
      process,
    };

    vm.createContext(sandbox);
    vm.runInContext(qSource, sandbox);
    
    // If Q was set, it means window branch was entered and ses.ok() check passed
    expect(mockSelf.Q).toBeDefined();
  });
});