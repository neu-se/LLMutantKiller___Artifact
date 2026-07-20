const filter = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js");

describe('filter mutation test', () => {
  it('should correctly filter data and handle async callbacks', (done) => {
    const inputData = [1, 2, 3, 4, 5];
    const expectedOutput = [2, 4];
    const results: number[] = [];

    let callCount = 0;
    const read = (end: any, callback: (end: any, data: any) => void) => {
      if (callCount >= inputData.length) {
        callback(true, null);
        return;
      }

      // Simulate async behavior
      setTimeout(() => {
        const data = inputData[callCount++];
        callback(false, data);
      }, 0);
    };

    const filteredRead = filter((data: number) => data % 2 === 0)(read);

    const process = () => {
      filteredRead(null, (end: any, data: any) => {
        if (end) {
          expect(results).toEqual(expectedOutput);
          done();
        } else {
          results.push(data);
          setTimeout(process, 0);
        }
      });
    };

    process();
  });
});