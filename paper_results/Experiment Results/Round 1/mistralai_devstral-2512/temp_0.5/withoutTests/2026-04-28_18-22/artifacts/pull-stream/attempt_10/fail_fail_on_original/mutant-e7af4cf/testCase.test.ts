const filter = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js");

describe('filter', () => {
  it('should handle synchronous data correctly', () => {
    const testData = [1, 2, 3, 4, 5];
    let index = 0;
    const read = (end: any, cb: (end: any, data?: any) => void) => {
      if (index >= testData.length) {
        return cb(true);
      }
      const data = testData[index++];
      cb(false, data);
    };

    const filteredRead = filter((data: number) => data % 2 === 0)(read);

    const results: number[] = [];
    let callbackCount = 0;
    filteredRead(null, (end: any, data?: any) => {
      callbackCount++;
      if (!end) {
        results.push(data);
      }
    });

    expect(callbackCount).toBe(6); // 5 data items + 1 end
    expect(results).toEqual([2, 4]);
  });
});