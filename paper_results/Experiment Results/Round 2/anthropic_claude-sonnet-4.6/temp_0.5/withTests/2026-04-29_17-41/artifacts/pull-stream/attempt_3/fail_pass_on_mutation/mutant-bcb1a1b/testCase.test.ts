import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce without initial accumulator value", () => {
  it("should use the first element as initial accumulator, not passing it through the reducer", (done) => {
    const values = [10, 20, 30];
    let i = 0;
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    // Called with only 2 arguments: reducer and callback (no initial accumulator)
    // Original: first value (10) becomes acc, reducer called for 20 and 30 only: 10+20+30=60
    // Mutated: acc=null, reducer called for all: null+10+20+30 = "null102030" (string concat)
    reduce(
      (acc: any, data: number) => acc + data,
      (err: any, result: any) => {
        expect(err).toBeNull();
        expect(result).toBe(60);
        done();
      }
    )(source);
  });
});