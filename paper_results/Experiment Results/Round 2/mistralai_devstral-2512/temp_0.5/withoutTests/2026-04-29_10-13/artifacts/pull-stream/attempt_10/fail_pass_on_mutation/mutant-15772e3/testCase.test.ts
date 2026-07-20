const filterModule = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js");

describe("filter mutation test", () => {
  it("should correctly handle sync/async filtering with rejected items", () => {
    const testData = [1, 3, 5, 2, 4]; // First 3 items should be rejected
    const expectedFiltered = [2, 4];
    const filteredResults: number[] = [];
    let readCallCount = 0;
    let callbackCallCount = 0;

    const read = (end: any, callback: (end: any, data?: any) => void) => {
      readCallCount++;
      if (testData.length === 0) {
        return callback(true);
      }

      const data = testData.shift();

      // First 3 calls should be synchronous (all rejected)
      if (readCallCount <= 3) {
        callback(null, data);
      } else {
        // Subsequent calls should be asynchronous
        setImmediate(() => {
          callback(null, data);
        });
      }
    };

    const filterFn = filterModule((data: number) => data % 2 === 0);
    const filteredRead = filterFn(read);

    const collect = (end: any, data?: any) => {
      callbackCallCount++;
      if (end) {
        expect(filteredResults).toEqual(expectedFiltered);
        // The mutation would cause incorrect behavior:
        // Original: 3 read calls for rejected items, then 2 more for accepted items
        // Mutated: Would get stuck in sync loop for rejected items
        expect(readCallCount).toBe(5);
        expect(callbackCallCount).toBe(3); // 2 data + 1 end
        return;
      }
      filteredResults.push(data);
    };

    filteredRead(null, collect);
  });
});