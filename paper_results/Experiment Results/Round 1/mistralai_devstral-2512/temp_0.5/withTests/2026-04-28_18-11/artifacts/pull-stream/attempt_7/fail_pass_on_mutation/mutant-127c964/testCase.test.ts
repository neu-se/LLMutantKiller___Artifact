const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source with object input', () => {
  it('should correctly process object values and not end prematurely', (done) => {
    const input = { a: 1, b: 2, c: 3 };
    const stream = values(input);
    const results: number[] = [];

    function read() {
      stream(null, (end: any, data: any) => {
        if (end === true) {
          // Should have collected all 3 values before ending
          expect(results).toEqual([1, 2, 3]);
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