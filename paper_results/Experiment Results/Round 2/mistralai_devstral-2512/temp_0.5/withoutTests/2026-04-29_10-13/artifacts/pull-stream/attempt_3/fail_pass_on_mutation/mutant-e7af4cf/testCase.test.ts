const filter = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js");

describe("filter mutation test", () => {
  it("should correctly filter synchronous data without hanging", () => {
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

    // Simulate the read calls
    filteredRead(null, (end: any, data?: any) => {
      if (!end && data !== undefined) {
        results.push(data);
      }
    });

    // Manually trigger all reads to completion
    for (let i = 0; i < input.length + 1; i++) {
      filteredRead(null, (end: any, data?: any) => {
        if (end) {
          expect(results).toEqual([1, 3, 5]);
        } else if (data !== undefined) {
          results.push(data);
        }
      });
    }
  });
});