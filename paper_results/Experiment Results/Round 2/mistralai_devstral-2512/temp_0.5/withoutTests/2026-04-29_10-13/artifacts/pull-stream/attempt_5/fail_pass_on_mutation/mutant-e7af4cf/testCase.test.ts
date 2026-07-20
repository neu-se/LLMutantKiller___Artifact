const filter = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js");

describe("filter mutation test", () => {
  it("should correctly handle synchronous filtering with multiple calls", () => {
    const input = [1, 2, 3, 4, 5];
    const results: number[] = [];
    let callIndex = 0;

    const read = (end: any, cb: (end: any, data?: any) => void) => {
      if (callIndex >= input.length) {
        cb(true);
        return;
      }
      const data = input[callIndex++];
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

    // Third call should process 4 (fails filter) and 5 (passes filter)
    filteredRead(null, (end: any, data?: any) => {
      if (!end && data !== undefined) {
        results.push(data);
      }
    });

    // Final call to end
    filteredRead(null, (end: any) => {
      if (end) {
        expect(results).toEqual([1, 3, 5]);
      }
    });
  });
});