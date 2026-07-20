const filter = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js");

describe("filter mutation test", () => {
  it("should correctly handle synchronous filtering with immediate data", () => {
    const input = [1, 2, 3];
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

    // First call should process 1 (passes filter)
    filteredRead(null, (end: any, data?: any) => {
      if (!end && data !== undefined) {
        results.push(data);
      }
    });

    // Second call should process 2 (fails filter) and 3 (passes filter)
    filteredRead(null, (end: any, data?: any) => {
      if (!end && data !== undefined) {
        results.push(data);
      }
    });

    // Final call to end
    filteredRead(null, (end: any) => {
      if (end) {
        expect(results).toEqual([1, 3]);
      }
    });
  });
});