import { readFileSync } from "fs";
import vm from "vm";
import path from "path";

describe("Q ses.ok() false early return", () => {
  it("should return early without setting ses.makeQ when ses.ok() returns false", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = readFileSync(qPath, "utf-8");

    // ses.ok() returns false: original returns early (no makeQ set), mutated continues (makeQ still not set via else)
    // BUT: in mutated code, after the if/else block, execution continues in the outer function
    // The outer function is the bootstrap/definition selector
    // After the ses block there's a window/self block - but window is undefined in our sandbox
    // Then there's a throw - so mutated code would throw!
    
    const ses = {
      ok: () => false,
      makeQ: undefined as any,
    };

    const sandbox: Record<string, any> = {
      ses,
      console,
      setTimeout,
      clearTimeout,
      process,
    };

    if (typeof setImmediate !== "undefined") {
      sandbox.setImmediate = setImmediate;
    }

    const context = vm.createContext(sandbox);
    const script = new vm.Script(qSource);
    
    // Original: ses.ok() false -> return -> no error
    // Mutated: ses.ok() false -> no return -> falls through to window check -> window undefined -> throws!
    expect(() => script.runInContext(context)).not.toThrow();
  });
});