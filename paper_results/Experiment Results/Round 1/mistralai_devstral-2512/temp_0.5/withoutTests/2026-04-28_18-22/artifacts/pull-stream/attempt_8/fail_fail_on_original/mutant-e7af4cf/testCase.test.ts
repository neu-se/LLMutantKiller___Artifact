const filter = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js");

describe('filter', () => {
  it('should handle synchronous data correctly', () => {
    const testData = [1, 2, 3, 4, 5];
    let index = 0;
    let callbackInvoked = false;
    const read = (end: any, cb: (end: any, data?: any) => void) => {
      if (index >= testData.length) {
        return cb(true);
      }
      const data = testData[index++];
      cb(false, data);
    };

    const filteredRead = filter((data: number) => data % 2 === 0)(read);

    const results: number[] = [];
    filteredRead(null, (end: any, data?: any) => {
      callbackInvoked = true;
      if (!end) {
        results.push(data);
      }
    });

    expect(callbackInvoked).toBe(true);
    expect(results).toEqual([2, 4]);
  });
});