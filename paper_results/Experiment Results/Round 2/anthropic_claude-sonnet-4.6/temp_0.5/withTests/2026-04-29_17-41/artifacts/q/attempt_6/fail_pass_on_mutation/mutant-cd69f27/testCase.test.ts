import * as fs from "fs";
import * as path from "path";

describe("SES environment - ses.ok() returning false", () => {
  it("should set ses.makeQ to the Q definition when ses.ok() returns true", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );

    const ses: { ok: () => boolean; makeQ?: any } = {
      ok: () => true,
    };

    const wrappedSource = `
      (function(bootstrap, exports, module, define, ses, window, self) {
        ${qSource}
      })
    `;

    const fn = eval(wrappedSource);
    fn(undefined, undefined, undefined, undefined, ses, undefined, undefined);

    // In both original and mutated, when ok() returns true, ses.makeQ should be set
    // to the definition function
    expect(typeof ses.makeQ).toBe("function");

    // Now verify Q works correctly through ses.makeQ
    const Q = ses.makeQ();
    expect(typeof Q).toBe("function");
    expect(typeof Q.defer).toBe("function");
    const deferred = Q.defer();
    deferred.resolve(42);
    return deferred.promise.then((val: number) => {
      expect(val).toBe(42);
    });
  });
});