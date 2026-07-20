const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source with object input', () => {
  it('should correctly iterate through object values without premature termination', (done) => {
    const input = { a: 1, b: 2, c: 3 };
    const stream = values(input);
    const results: number[] = [];
    let readCount = 0;

    function read() {
      readCount++;
      stream(null, (end: any, data: any) => {
        if (end === true) {
          // Should have exactly 4 calls: 3 data + 1 end
          expect(readCount).toBe(4);
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