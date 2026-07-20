const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values with non-array object', () => {
  it('should convert object values to array', (done) => {
    const read = values({a: 1, b: 2, c: 3});
    const results: any[] = [];

    read(null, (end: any, data: any) => {
      if (end === true) {
        expect(results).toEqual([1, 2, 3]);
        done();
      } else {
        results.push(data);
        read(null, (end: any, data: any) => {
          if (end === true) {
            expect(results).toEqual([1, 2, 3]);
            done();
          } else {
            results.push(data);
            read(null, (end: any, data: any) => {
              if (end === true) {
                expect(results).toEqual([1, 2, 3]);
                done();
              } else {
                results.push(data);
                read(null, (end: any, data: any) => {
                  expect(end).toBe(true);
                  expect(data).toBeUndefined();
                  expect(results).toEqual([1, 2, 3]);
                  done();
                });
              }
            });
          }
        });
      }
    });
  });
});