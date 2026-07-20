import * as fs from "fs";
import * as path from "path";

describe("SES environment", () => {
  it("should not set ses.makeQ when ses.ok() returns false, and ses.ok() returning true should set it", () => {
    const qSource = fs.readFileSync(
      path.resolve(
        __dirname,
        "../../../../../../../../../../../subject_repositories/q/q.js"
      ),
      "utf8"
    );

    // First: ses.ok() returns false - makeQ should NOT be set
    const ses1: { ok: () => boolean; makeQ?: any } = {
      ok: () => false,
    };

    const wrappedSource = `(function(bootstrap, exports, module, define, ses, window, self) {
      ${qSource}
    })`;

    const fn = eval(wrappedSource);
    fn(undefined, undefined, undefined, undefined, ses1, undefined, undefined);
    expect(ses1.makeQ).toBeUndefined();

    // Second: ses.ok() returns true - makeQ SHOULD be set to definition
    const ses2: { ok: () => boolean; makeQ?: any } = {
      ok: () => true,
    };
    fn(undefined, undefined, undefined, undefined, ses2, undefined, undefined);
    expect(typeof ses2.makeQ).toBe("function");

    // ses.makeQ should be the definition factory - calling it returns Q
    const Q = ses2.makeQ();
    expect(typeof Q).toBe("function");
    expect(typeof Q.defer).toBe("function");

    // Now verify: when ok() is false, after the mutation the behavior changes
    // In original: return exits early, so if there were code after the if/else it wouldn't run
    // The key observable: ses1.makeQ must remain undefined
    expect(ses1.makeQ).toBeUndefined();
  });
});