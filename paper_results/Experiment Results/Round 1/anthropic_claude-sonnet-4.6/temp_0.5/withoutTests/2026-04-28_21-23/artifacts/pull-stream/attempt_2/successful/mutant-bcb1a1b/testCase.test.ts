import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js"

describe("reduce without initial accumulator (2 arguments)", () => {
  it("should use first element as initial acc and not pass it to reducer when called with 2 args", (done) => {
    const values = [1, 2, 3];
    let index = 0;
    const reducerCalls: Array<[any, any]> = [];

    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) return cb(end);
      if (index >= values.length) {
        return cb(true);
      }
      cb(null, values[index++]);
    };

    // With 2 args, original code uses first element (1) as acc without calling reducer on it
    // So reducer is called: (1,2) -> 3, (3,3) -> 6. Final result: 6
    // With mutation (if false), sink is returned directly with acc=null
    // Reducer is called: (null,1) -> null+1=1, (1,2) -> 3, (3,3) -> 6. Final result: 6
    // Same result! Need to track number of reducer calls instead.
    const sink = reduce(
      (acc: any, data: number) => {
        reducerCalls.push([acc, data]);
        return (acc ?? 0) + data;
      },
      (err: any, result: number) => {
        expect(err).toBeNull();
        // Original: reducer called 2 times (with args [1,2] and [3,3])
        // Mutated: reducer called 3 times (with args [null,1], [1,2], [3,3])
        expect(reducerCalls.length).toBe(2);
        expect(reducerCalls[0]).toEqual([1, 2]);
        done();
      }
    );

    sink(source);
  });
});