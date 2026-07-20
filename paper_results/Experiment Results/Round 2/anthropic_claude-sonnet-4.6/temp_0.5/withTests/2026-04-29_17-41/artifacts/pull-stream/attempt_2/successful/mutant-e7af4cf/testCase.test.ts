import filter from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js";

describe("filter", () => {
  it("should filter many synchronous values without stack overflow", (done) => {
    const TOTAL = 10000;
    let index = 0;

    // Purely synchronous source
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) {
        cb(end);
        return;
      }
      if (index >= TOTAL) {
        cb(true);
        return;
      }
      cb(null, index++);
    };

    // Only pass the very last item, forcing TOTAL-1 synchronous filtered reads in one call
    const filterThrough = filter((x: number) => x === TOTAL - 1);
    const read = filterThrough(source);

    const results: number[] = [];

    const step = (end: any, data?: any) => {
      if (end === true) {
        expect(results).toEqual([TOTAL - 1]);
        done();
        return;
      }
      if (end) {
        done(end instanceof Error ? end : new Error(String(end)));
        return;
      }
      results.push(data);
      read(null, step);
    };

    read(null, step);
  });
});