const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source with object input', () => {
  it('should correctly iterate over object values', (done) => {
    const input = { a: 1, b: 2, c: 3 };
    const expected = [1, 2, 3];
    let results: number[] = [];

    const stream = values(input);
    let readCount = 0;

    function read() {
      stream(null, (end: any, data: any) => {
        readCount++;
        if (end === true) {
          expect(results).toEqual(expected);
          expect(readCount).toBe(4); // 3 data + 1 end
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