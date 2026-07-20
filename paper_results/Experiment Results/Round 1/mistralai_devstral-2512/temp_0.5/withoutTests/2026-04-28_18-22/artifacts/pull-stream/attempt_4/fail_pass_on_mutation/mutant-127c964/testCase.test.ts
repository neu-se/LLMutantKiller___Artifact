import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values source', () => {
  it('should handle non-array objects by converting them to arrays of values', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const source = values(obj);

    const results: number[] = [];
    let ended = false;

    // First call should return first value
    source(null, (end: any, data: any) => {
      expect(end).toBe(null);
      expect(data).toBe(1);
      results.push(data);
    });

    // Second call should return second value
    source(null, (end: any, data: any) => {
      expect(end).toBe(null);
      expect(data).toBe(2);
      results.push(data);
    });

    // Third call should return third value
    source(null, (end: any, data: any) => {
      expect(end).toBe(null);
      expect(data).toBe(3);
      results.push(data);
    });

    // Fourth call should end the stream
    source(null, (end: any, data: any) => {
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      ended = true;
    });

    expect(results).toEqual([1, 2, 3]);
    expect(ended).toBe(true);
  });
});