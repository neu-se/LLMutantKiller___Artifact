const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values with object input', () => {
  it('should correctly iterate over object values', (done) => {
    const testObj = {x: 10, y: 20, z: 30};
    const read = values(testObj);
    const results: number[] = [];

    function readValues() {
      read(null, (end: any, data: any) => {
        if (end) {
          expect(results).toEqual([10, 20, 30]);
          done();
        } else {
          results.push(data);
          if (results.length < 3) {
            readValues();
          } else {
            read(null, (end: any, data: any) => {
              expect(end).toBe(true);
              expect(results).toEqual([10, 20, 30]);
              done();
            });
          }
        }
      });
    }

    readValues();
  });
});