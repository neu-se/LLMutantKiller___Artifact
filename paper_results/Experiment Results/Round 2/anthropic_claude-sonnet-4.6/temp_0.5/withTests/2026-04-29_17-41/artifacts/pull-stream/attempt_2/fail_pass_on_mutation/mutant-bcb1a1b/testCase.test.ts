import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce without initial accumulator value", () => {
  it("should use the first element as the initial accumulator when called with only reducer and callback", (done) => {
    const values = [1, 2, 3];
    let i = 0;
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    // Called with only 2 arguments: reducer and callback (no initial accumulator)
    const sink = reduce(
      (acc: number, data: number) => acc + data,
      (err: any, result: number) => {
        expect(err).toBeNull();
        // First element (1) becomes initial acc, then reducer applies: 1+2=3, 3+3=6
        expect(result).toBe(6);
        done();
      }
    );

    // With original code: sink is a through-stream (function accepting source)
    // that reads first value as initial accumulator
    // With mutated code: sink is a drain that uses null as accumulator → NaN result
    sink(source);
  });
});