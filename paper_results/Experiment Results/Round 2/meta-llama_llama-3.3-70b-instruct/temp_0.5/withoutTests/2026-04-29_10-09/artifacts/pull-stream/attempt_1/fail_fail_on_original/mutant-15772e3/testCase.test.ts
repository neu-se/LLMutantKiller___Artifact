import { filter } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter function', () => {
  it('should correctly handle asynchronous data processing', (done) => {
    const testData = [1, 2, 3, 4, 5];
    const expectedData = [2, 4];
    const testFunction = (data: number) => data % 2 === 0;
    let index = 0;

    const read = () => {
      return (end: any, cb: any) => {
        if (index >= testData.length) {
          cb(true, null);
        } else {
          cb(false, testData[index++]);
        }
      };
    };

    const next = filter(testFunction)(read())(false, (end: any, data: any) => {
      if (end) {
        done();
      } else if (data !== undefined) {
        if (expectedData.includes(data)) {
          expectedData.splice(expectedData.indexOf(data), 1);
        } else {
          done(new Error('Unexpected data received'));
        }
      }
    });
  });
});