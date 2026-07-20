import * as fs from "fs";
import * as path from "path";
import * as vm from "vm";

describe("Q ses branch behavior", () => {
  it("should set window.Q when ses is undefined and window is defined", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );

    // ses is NOT defined, so we fall through to the window/self branch
    // Inside that branch: if (!ses.ok()) - but ses is undefined here
    // The placeholder must reference a ses that was set earlier somehow
    // Let's try: ses defined with ok()=false so typeof ses !== "undefined" is true
    // but ses block is empty, so we skip to window block
    // Then inside window block: if (!ses.ok()) with ses.ok()=false => !false=true => enter block
    // Original: window.Q gets set
    // Mutated: if (ses.ok()) with ses.ok()=false => false => skip block => window.Q NOT set
    const sandbox: any = {
      ses: { ok: () => false },
      window: {},
      self: {},
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
    };

    vm.createContext(sandbox);
    vm.runInContext(qSource, sandbox);

    expect(sandbox.window.Q).toBeDefined();
    expect(typeof sandbox.window.Q).toBe("function");
  });
});