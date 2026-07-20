const filterModule = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js");

describe("filter mutation test", () => {
  it("should correctly handle sync/async filtering with specific timing", () => {
    const testData = [1, 2, 3, 4, 5, 6];
    const expectedFiltered = [2, 4, 6];
    const filteredResults: number[] = [];
    let syncCalls = 0;
    let asyncCalls = 0;

    const read = (end: any, callback: (end: any, data?: any) => void) => {
      if (testData.length === 0) {
        return callback(true);
      }

      const data = testData.shift();

      // First 3 items should be rejected (1, 3, 5)
      // This creates a specific pattern of sync/async behavior
      if (testData.length >= 3) {
        syncCalls++;
        callback(null, data);
      } else {
        asyncCalls++;
        setImmediate(() => {
          callback(null, data);
        });
      }
    };

    const filterFn = filterModule((data: number) => data % 2 === 0);
    const filteredRead = filterFn(read);

    const collect = (end: any, data?: any) => {
      if (end) {
        expect(filteredResults).toEqual(expectedFiltered);
        // The mutation would cause incorrect sync/async handling
        // Original: sync=1, async=2 (correct)
        // Mutated: sync=3, async=0 (incorrect)
        expect(syncCalls).toBe(1);
        expect(asyncCalls).toBe(2);
        return;
      }
      filteredResults.push(data);
    };

    filteredRead(null, collect);
  });
});