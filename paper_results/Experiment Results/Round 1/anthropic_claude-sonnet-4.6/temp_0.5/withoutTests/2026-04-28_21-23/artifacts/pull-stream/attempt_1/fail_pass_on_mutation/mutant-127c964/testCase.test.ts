import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values source with array input", () => {
  it("should iterate over array elements without converting them via Object.keys when given an array", (done) => {
    const input = [10, 20, 30];
    const source = values(input);
    const results: number[] = [];

    function read() {
      source(null, (end: any, data: any) => {
        if (end === true) {
          // Stream ended
          expect(results).toEqual([10, 20, 30]);
          done();
        } else if (end) {
          done(end);
        } else {
          results.push(data);
          read();
        }
      });
    }

    read();
  });
});