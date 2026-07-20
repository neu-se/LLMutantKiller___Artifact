const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values with non-array input', () => {
  it('should process object values correctly', (done) => {
    const obj = {a: 1, b: 2, c: 3};
    const read = values(obj);
    const results: number[] = [];

    function readNext() {
      read(null, (end: any, data: any) => {
        if (end === true) {
          expect(results).toEqual([1, 2, 3]);
          done();
        } else {
          results.push(data);
          readNext();
        }
      });
    }

    readNext();
  });
});