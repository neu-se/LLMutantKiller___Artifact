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
    let callCount = 0;
    let endCalled = false;

    filteredRead(null, (end: any, data?: any) => {
      callCount++;
      if (end) {
        endCalled = true;
      } else {
        results.push(data);
      }
    });

    expect(endCalled).toBe(true);
    expect(results).toEqual([2, 4]);
    expect(callCount).toBe(6); // 5 data items + 1 end
  });
});