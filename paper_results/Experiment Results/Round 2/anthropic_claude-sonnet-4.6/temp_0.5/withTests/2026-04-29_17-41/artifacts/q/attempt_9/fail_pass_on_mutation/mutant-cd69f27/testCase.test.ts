import * as fs from "fs";
import * as path from "path";

describe("SES environment branch", () => {
  it("calls ses.ok() and only sets ses.makeQ when ses.ok() returns true", () => {
    const qSource = fs.readFileSync(
      path.resolve(
        __dirname,
        "../../../../../../../../../../../subject_repositories/q/q.js"
      ),
      "utf8"
    );

    const wrappedSource = `(function(bootstrap, exports, module, define, ses, window, self) {
      ${qSource}
    })`;

    const fn = eval(wrappedSource);

    let okCallCount = 0;
    const ses: { ok: () => boolean; makeQ?: any } = {
      ok: () => {
        okCallCount++;
        return false;
      },
    };

    fn(undefined, undefined, undefined, undefined, ses, undefined, undefined);

    // ses.ok() should have been called exactly once
    expect(okCallCount).toBe(1);
    // ses.makeQ should not be set when ok() returns false
    expect(ses.makeQ).toBeUndefined();
  });
});