const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap with null map function', () => {
  it('should pass through data unchanged when map function is null', () => {
    const testData = [1, 2, 3];
    let index = 0;
    const results: number[] = [];

    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      if (index >= testData.length) {
        cb(true);
      } else {
        cb(null, testData[index++]);
      }
    };

    const transform = asyncMap(null);
    const sink = (abort: any, cb: (err: any, data?: any) => void) => {
      transform(source)(abort, (end: any, data: any) => {
        if (end) {
          expect(results).toEqual(testData);
        } else {
          results.push(data);
          cb(null);
        }
      });
    };

    // Execute the stream
    sink(null, () => {});

    // Verify results after stream completes
    expect(results).toEqual(testData);
  });
});