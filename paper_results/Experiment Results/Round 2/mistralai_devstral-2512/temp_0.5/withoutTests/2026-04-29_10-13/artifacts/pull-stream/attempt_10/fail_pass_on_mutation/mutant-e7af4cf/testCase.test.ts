const filter = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js");

describe("filter mutation test", () => {
  it("should correctly handle synchronous filtering with immediate callback execution", () => {
    const input = [1, 2, 3, 4, 5];
    const results: number[] = [];
    let callIndex = 0;
    let readCalls = 0;

    const read = (end: any, cb: (end: any, data?: any) => void) => {
      readCalls++;
      if (callIndex >= input.length) {
        cb(true);
        return;
      }
      const data = input[callIndex++];
      // Immediately call callback to test sync behavior
      cb(null, data);
    };

    const filteredRead = filter((data: number) => data % 2 !== 0)(read);

    // First call
    filteredRead(null, (end: any, data?: any) => {
      if (!end && data !== undefined) {
        results.push(data);
      }
    });

    // Second call - should trigger sync behavior difference
    filteredRead(null, (end: any, data?: any) => {
      if (!end && data !== undefined) {
        results.push(data);
      }
    });

    // Third call
    filteredRead(null, (end: any, data?: any) => {
      if (!end && data !== undefined) {
        results.push(data);
      }
    });

    // Final call to end
    filteredRead(null, (end: any) => {
      if (end) {
        expect(results).toEqual([1, 3, 5]);
        expect(readCalls).toBe(6); // Should have called read exactly 6 times
      }
    });
  });
});