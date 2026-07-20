import * as fs from "fs";
import * as path from "path";

describe("SES environment branch", () => {
  it("when ses.ok returns false, ses.makeQ should not be set and window fallback should not execute", () => {
    const qSource = fs.readFileSync(
      path.resolve(
        __dirname,
        "../../../../../../../../../../../subject_repositories/q/q.js"
      ),
      "utf8"
    );

    // In the original, return; exits the outer function early when ses.ok() is false.
    // In the mutated version, there is no return, so execution continues past the
    // if/else block. Since this is an else-if chain, the window/self branch won't
    // execute. But we can test the interaction: provide both ses AND window/self,
    // and verify that the window branch does NOT execute (because the ses branch
    // was already taken). This should be the same in both versions.
    //
    // The real observable difference: in original, `return` means the outer
    // wrapper function returns undefined explicitly. In mutated, it falls through.
    // We can capture the return value of the outer IIFE wrapper.

    const wrappedSource = `(function(bootstrap, exports, module, define, ses, window, self) {
      ${qSource}
    })`;

    const fn = eval(wrappedSource);

    const windowObj: any = { Q: "original" };

    const ses: { ok: () => boolean; makeQ?: any } = {
      ok: () => false,
    };

    // Provide ses AND window - in original, return exits before window code runs
    // In mutated, no return but else-if means window branch still won't run
    // Both should leave windowObj.Q as "original"
    fn(undefined, undefined, undefined, undefined, ses, windowObj, undefined);

    expect(ses.makeQ).toBeUndefined();
    // window.Q should not have been set since ses branch was taken
    expect(windowObj.Q).toBe("original");
  });
});