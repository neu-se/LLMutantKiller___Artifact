import Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("long stack traces makeStackTraceLong", () => {
  it("should include stacks from multiple chained promises when error propagates through catch handlers", (done) => {
    Q.longStackSupport = true;

    function step1(): any {
      return Q.resolve(1)
        .then(function stepA() { return step2(); })
        .then(function stepB() { return "done"; });
    }

    function step2(): any {
      return Q.resolve(2)
        .then(function stepC() { return step3(); })
        .then(function stepD() { return "done2"; });
    }

    function step3(): any {
      return Q.resolve(3)
        .then(function stepE() { return step4(); });
    }

    function step4(): any {
      return Q.resolve(4)
        .then(function stepF() {
          throw new Error("deep error");
        });
    }

    step1().then(
      function () {
        Q.longStackSupport = false;
        done(new Error("Should have rejected"));
      },
      function (err: any) {
        Q.longStackSupport = false;
        try {
          const stack: string = err.stack || "";
          // The original code walks back through the promise chain and adds
          // stacks for promises created before the rejection (lower stackCounter).
          // Each time it finds a qualifying promise, it updates __minimumStackCounter__
          // to p.stackCounter (going lower), allowing even older frames to be added.
          // The mutated code: once __minimumStackCounter__ is set (first iteration),
          // the condition `false` prevents any further updates or additions.
          // So original produces multiple "From previous event:" while mutated produces 1.
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