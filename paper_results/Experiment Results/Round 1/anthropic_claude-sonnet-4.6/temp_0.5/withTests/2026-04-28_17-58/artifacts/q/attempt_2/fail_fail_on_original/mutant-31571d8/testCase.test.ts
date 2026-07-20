import Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("long stack traces", () => {
  it("should concatenate stack frames from multiple promise chain levels when error propagates", (done) => {
    Q.longStackSupport = true;

    function level1(): any {
      return Q.resolve(undefined).then(function level1Handler() {
        return level2();
      });
    }

    function level2(): any {
      return Q.resolve(undefined).then(function level2Handler() {
        return level3();
      });
    }

    function level3(): any {
      return Q.resolve(undefined).then(function level3Handler() {
        throw new Error("test error from level3");
      });
    }

    level1().then(
      function () {
        Q.longStackSupport = false;
        done(new Error("Should have rejected"));
      },
      function (err: any) {
        Q.longStackSupport = false;
        try {
          const stack: string = err.stack || "";
          // With original code: __minimumStackCounter__ gets updated each iteration
          // allowing multiple stack frames to be collected.
          // With mutated code: once __minimumStackCounter__ is set, subsequent
          // frames are skipped, resulting in fewer "From previous event:" separators.
          const separatorCount = (stack.match(/From previous event:/g) || []).length;
          expect(separatorCount).toBeGreaterThanOrEqual(2);
          done();
        } catch (e) {
          done(e);
        }
      }
    );
  });
});