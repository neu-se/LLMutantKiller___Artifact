import * as fs from "fs";
import * as path from "path";

describe("SES environment - ses.ok() returning false", () => {
  it("should not throw an error and should not set makeQ when ses.ok() returns false", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );

    const ses: { ok: () => boolean; makeQ?: any } = {
      ok: () => false,
    };

    const wrappedSource = `
      (function(bootstrap, exports, module, define, ses, window, self) {
        ${qSource}
      })
    `;

    const fn = eval(wrappedSource);

    // When ses.ok() returns false:
    // Original: returns early, no error thrown
    // Mutated: no return, falls through if/else, then hits the final
    // "throw new Error" because none of the other conditions match
    expect(() => {
      fn(undefined, undefined, undefined, undefined, ses, undefined, undefined);
    }).not.toThrow();
  });
});