import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe("count source", () => {
  it("should emit exactly max values when max is specified (value at index max-1 is the last valid value)", (done) => {
    const max = 3;
    const source = count(max);
    const results: number[] = [];

    function read() {
      source(null, (end: any, value: number) => {
        if (end === true) {
          // Stream ended
          // With original code (i > max): values 0, 1, 2, 3 are emitted (4 values when max=3)
          // With mutated code (i >= max): values 0, 1, 2 are emitted (3 values when max=3)
          // We expect the stream to emit values 0, 1, 2, 3 (i.e., max+1 values)
          expect(results).toEqual([0, 1, 2, 3]);
          done();
        } else if (end) {
          done(end);
        } else {
          results.push(value);
          read();
        }
      });
    }

    read();
  });
});