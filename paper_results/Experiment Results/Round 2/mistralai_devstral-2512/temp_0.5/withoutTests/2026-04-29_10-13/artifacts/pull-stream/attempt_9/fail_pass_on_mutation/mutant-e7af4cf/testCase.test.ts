const filter = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js");

describe("filter mutation test", () => {
  it("should correctly handle synchronous filtering with rapid successive calls", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const results: number[] = [];
    let callIndex = 0;

    const read = (end: any, cb: (end: any, data?: any) => void) => {
      if (callIndex >= input.length) {
        cb(true);
        return;
      }
      const data = input[callIndex++];
      // Immediately call callback to test sync behavior
      cb(null, data);
    };

    const filteredRead = filter((data: number) => data % 2 !== 0)(read);

    // Make rapid successive calls to trigger the sync behavior difference
    for (let i = 0; i < 20; i++) {
      filteredRead(null, (end: any, data?: any) => {
        if (!end && data !== undefined) {
          results.push(data);
        }
      });
    }

    // Final call to end
    filteredRead(null, (end: any) => {
      if (end) {
        // The mutation would cause some filtered values to be missed
        // due to incorrect sync handling
        expect(results).toEqual([1, 3, 5, 7, 9]);
      }
    });
  });
});