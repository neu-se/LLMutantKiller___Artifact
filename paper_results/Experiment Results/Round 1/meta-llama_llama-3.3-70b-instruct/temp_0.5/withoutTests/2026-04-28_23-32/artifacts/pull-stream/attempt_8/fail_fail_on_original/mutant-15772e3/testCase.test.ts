const filterModule = require('../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js');

describe('filter function', () => {
  it('should handle asynchronous data correctly', (done) => {
    const sourceData = [1, 2, 3, 4, 5];
    const expectedData = [2, 4];
    const test = (data: number) => data % 2 === 0;
    let receivedData: number[] = [];

    const read = (end: boolean, cb: (end: boolean, data: number | undefined) => void) => {
      if (sourceData.length > 0) {
        cb(false, sourceData.shift());
      } else {
        cb(true, undefined);
      }
    };

    const filter = filterModule;
    const next = filter(test)(read);

    next(false, (end: boolean, data: number | undefined) => {
      if (end) {
        expect(receivedData).toEqual(expectedData);
        done();
      } else if (data !== undefined) {
        receivedData.push(data);
        next(false, (end: boolean, data: number | undefined) => {
          if (end) {
            expect(receivedData).toEqual(expectedData);
            done();
          } else if (data !== undefined) {
            receivedData.push(data);
            next(false, (end: boolean, data: number | undefined) => {
              if (end) {
                expect(receivedData).toEqual(expectedData);
                done();
              }
            });
          }
        });
      }
    });
  });
});