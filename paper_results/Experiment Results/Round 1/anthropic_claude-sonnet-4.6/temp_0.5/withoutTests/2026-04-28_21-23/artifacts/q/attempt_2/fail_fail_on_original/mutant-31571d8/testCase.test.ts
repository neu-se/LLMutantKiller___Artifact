import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong with long stack support", () => {
  it("should concatenate multiple promise stacks when error stackCounter allows it", (done) => {
    Q.longStackSupport = true;

    // Create a deep enough promise chain so that multiple stacks get concatenated
    // The original code includes stacks where p.stackCounter < error.__minimumStackCounter__
    // The mutation breaks this by replacing the comparison with false
    
    const d1 = Q.defer();
    const d2 = Q.defer();
    const d3 = Q.defer();

    const p1 = d1.promise;
    const p2 = d2.promise;
    const p3 = d3.promise;

    // Chain them so source links are established
    const chain = p1
      .then(function step1() {
        return p2;
      })
      .then(function step2() {
        return p3;
      })
      .then(function step3() {
        throw new Error("deliberate error");
      });

    chain.fail(function(err: any) {
      try {
        const stack = err.stack || "";
        // With the original code, multiple "From previous event:" separators appear
        // because the loop includes stacks with stackCounter < __minimumStackCounter__
        // With the mutation, only 1 separator appears (only the first stack is added)
        const separatorCount = (stack.match(/From previous event:/g) || []).length;
        expect(separatorCount).toBeGreaterThanOrEqual(2);
        done();
      } catch (e) {
        done(e);
      }
    });

    d1.resolve(1);
    d2.resolve(2);
    d3.resolve(3);
  });
});