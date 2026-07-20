import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe("take", () => {
  it("should propagate end signal to callback when source ends naturally", (done) => {
    let i = 0;
    const values = [1, 2];

    // Finite source that yields 2 items then signals end
    function source(end: any, cb: (end: any, data?: any) => void) {
      if (end) return cb(end);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    }

    // take with a test that always passes (never stops early on its own)
    // so the source will naturally end before take stops it
    const through = take(Boolean);
    const read = through(source);

    const results: number[] = [];

    function drain(end: any, data?: any): void {
      if (end === true) {
        expect(results).toEqual([1, 2]);
        done();
        return;
      }
      if (end) {
        done(end);
        return;
      }
      results.push(data as number);
      read(null, drain);
    }

    read(null, drain);
  });
});