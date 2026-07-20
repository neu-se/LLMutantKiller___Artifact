import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q ses branch", () => {
  it("should set global Q when ses is defined and ses.ok() returns true", () => {
    const qSource = fs.readFileSync(
      path.join(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    const fakeWindow: Record<string, unknown> = {};

    // Must explicitly set exports and module to undefined to prevent CommonJS path
    // Also need to make sure 'define' is not a function
    const sandbox: Record<string, unknown> = Object.create(null);
    sandbox["exports"] = undefined;
    sandbox["module"] = undefined;
    sandbox["define"] = undefined;
    sandbox["bootstrap"] = undefined;
    sandbox["ses"] = { ok: () => true };
    sandbox["window"] = fakeWindow;
    sandbox["self"] = fakeWindow;
    sandbox["console"] = console;
    sandbox["setTimeout"] = setTimeout;
    sandbox["clearTimeout"] = clearTimeout;
    sandbox["setImmediate"] = setImmediate;
    sandbox["process"] = undefined;

    const context = vm.createContext(sandbox);

    vm.runInContext(qSource, context);

    // Structure: if (!ses.ok()) { [empty] } else if (window) { set Q } else { throw }
    // Original with ses.ok()=true: !true=false => skips empty block => enters window else-if => Q IS set
    // Mutated with ses.ok()=true:  true=true  => enters empty block => skips window else-if => Q NOT set
    expect(fakeWindow["Q"]).toBeDefined();
  });
});