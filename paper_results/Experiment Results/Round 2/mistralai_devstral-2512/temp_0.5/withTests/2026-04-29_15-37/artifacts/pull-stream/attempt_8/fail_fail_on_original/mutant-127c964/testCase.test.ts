const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values with object input', () => {
  it('should correctly iterate over object values', (done) => {
    const testObj = {x: 10, y: 20, z: 30};
    const read = values(testObj);
    const results: number[] = [];

    read(null, (end: any, data: any) => {
      if (end === true) {
        expect(results).toEqual([10, 20, 30]);
        done();
      } else {
        results.push(data);
        read(null, (end: any, data: any) => {
          if (end === true) {
            expect(results).toEqual([10, 20, 30]);
            done();
          } else {
            results.push(data);
            read(null, (end: any, data: any) => {
              expect(end).toBe(true);
              expect(results).toEqual([10, 20, 30]);
              done();
            });
          }
        });
      }
    });
  });
});