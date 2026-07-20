import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe("take mutation test", () => {
  it("should correctly handle termination when last is false", () => {
    const takeStream = take(2, { last: false });

    let callCount = 0;
    const mockRead = (end: any, cb: (end: any, data?: any) => void) => {
      callCount++;
      if (callCount === 1) {
        cb(null, 1);
      } else if (callCount === 2) {
        cb(null, 2);
      } else if (callCount === 3) {
        cb(true);
      }
    };

    const read = takeStream(mockRead);
    const results: any[] = [];

    // First call - should get data
    read(null, (end: any, data: any) => {
      results.push({ end, data });
    });

    // Second call - should get data
    read(null, (end: any, data: any) => {
      results.push({ end, data });
    });

    // Third call - should terminate
    read(null, (end: any, data: any) => {
      results.push({ end, data });
    });

    expect(results).toEqual([
      { end: null, data: 1 },
      { end: null, data: 2 },
      { end: true, data: undefined }
    ]);
    expect(callCount).toBe(3);
  });
});