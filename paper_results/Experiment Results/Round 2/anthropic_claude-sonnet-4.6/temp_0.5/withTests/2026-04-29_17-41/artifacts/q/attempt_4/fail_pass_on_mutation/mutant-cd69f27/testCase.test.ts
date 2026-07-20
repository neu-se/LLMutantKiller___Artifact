import * as fs from "fs";
import * as path from "path";

describe("SES environment - ses.ok() returning false", () => {
  it("should not assign ses.makeQ when ses.ok() returns false", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );

    // We'll invoke the outer IIFE with a controlled environment by wrapping it
    // in a function that provides fake globals
    const ses: { ok: () => boolean; makeQ?: any } = {
      ok: () => false,
    };

    // Create a wrapper that sets up the environment where:
    // - bootstrap is not a function
    // - exports/module are not objects (bypass CommonJS)
    // - define is not a function (bypass RequireJS)
    // - ses is defined (trigger SES branch)
    // - window/self are not defined (bypass browser branch)
    const wrappedSource = `
      (function(bootstrap, exports, module, define, ses, window, self) {
        ${qSource}
      })
    `;

    const fn = eval(wrappedSource);
    // Call with: bootstrap=undefined, exports=undefined, module=undefined,
    // define=undefined, ses=our ses object, window=undefined, self=undefined
    fn(undefined, undefined, undefined, undefined, ses, undefined, undefined);

    // Original: early return when ses.ok() is false => ses.makeQ NOT set
    // Mutated: no early return => ses.makeQ IS set
    expect(ses.makeQ).toBeUndefined();
  });
});