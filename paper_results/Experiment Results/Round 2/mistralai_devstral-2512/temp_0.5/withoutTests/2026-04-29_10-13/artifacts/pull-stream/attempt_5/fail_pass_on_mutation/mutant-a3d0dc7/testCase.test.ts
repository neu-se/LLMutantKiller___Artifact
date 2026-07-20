const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source', () => {
  it('should handle multiple calls without aborting', () => {
    const array = [1, 2, 3];
    const source = values(array);

    const results: number[] = [];
    let completed = false;

    // First call - should get first value
    source(null, (end: boolean | null, data?: number) => {
      if (end === true) {
        completed = true;
      } else if (data !== undefined) {
        results.push(data);
      }
    });

    // Second call - should get second value
    source(null, (end: boolean | null, data?: number) => {
      if (end === true) {
        completed = true;
      } else if (data !== undefined) {
        results.push(data);
      }
    });

    // Third call - should get third value
    source(null, (end: boolean | null, data?: number) => {
      if (end === true) {
        completed = true;
      } else if (data !== undefined) {
        results.push(data);
      }
    });

    // Fourth call - should complete
    source(null, (end: boolean | null) => {
      if (end === true) {
        completed = true;
      }
    });

    expect(results).toEqual([1, 2, 3]);
    expect(completed).toBe(true);
  });
});