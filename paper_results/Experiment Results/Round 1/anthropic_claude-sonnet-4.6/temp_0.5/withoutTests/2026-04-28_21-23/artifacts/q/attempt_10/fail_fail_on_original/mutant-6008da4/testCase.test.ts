import domain from "domain";

describe("Q isNodeJS initial value", () => {
  it("does not track process.domain on tasks when isNodeJS initial value is false", (done) => {
    // Override process.toString to make Q's Node.js detection fail,
    // so the initial value of isNodeJS is preserved
    const origToString = process.toString;
    (process as any).toString = () => "[object Object]";

    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Restore process.toString
    (process as any).toString = origToString;

    const d = domain.create();
    let domainExitCount = 0;
    const origExit = d.exit.bind(d);
    d.exit = () => {
      domainExitCount++;
      origExit();
    };

    d.run(() => {
      Q(1).then((val: number) => {
        // Original (isNodeJS=false): domain field on task is `false && process.domain = false`
        // so domain.exit() is never called by runSingle -> domainExitCount === 0
        // Mutated (isNodeJS=true): domain field on task is `true && process.domain = d`
        // so domain.exit() IS called by runSingle -> domainExitCount > 0
        expect(domainExitCount).toBe(0);
        done();
      });
    });
  });
});