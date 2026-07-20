import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values source', () => {
  it('should handle non-array objects by converting them to arrays of values', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const source = values(obj);

    let callCount = 0;
    const results: number[] = [];

    // First call should return first value
    source(null, (end: any, data: any) => {
      callCount++;
      if (!end) {
        results.push(data);
      }
    });

    // Second call should return second value
    source(null, (end: any, data: any) => {
      callCount++;
      if (!end) {
        results.push(data);
      }
    });

    // Third call should return third value
    source(null, (end: any, data: any) => {
      callCount++;
      if (!end) {
        results.push(data);
      }
    });

    // Fourth call should end the stream
    source(null, (end: any, data: any) => {
      callCount++;
      expect(end).toBe(true);
      expect(callCount).toBe(4);
      expect(results).toEqual([1, 2, 3]);
    });
  });
});