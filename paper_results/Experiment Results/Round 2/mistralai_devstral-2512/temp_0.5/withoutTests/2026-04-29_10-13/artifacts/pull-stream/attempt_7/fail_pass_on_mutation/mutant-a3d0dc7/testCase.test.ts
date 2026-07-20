const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source', () => {
  it('should emit values when called with non-abort parameters', () => {
    const array = [1, 2, 3];
    const source = values(array);

    const results: number[] = [];
    let completed = false;

    // First call with null (no abort)
    source(null, (end: boolean | null, data?: number) => {
      if (end === true) {
        completed = true;
      } else if (data !== undefined) {
        results.push(data);
      }
    });

    // Second call with false (falsy but not null)
    source(false, (end: boolean | null, data?: number) => {
      if (end === true) {
        completed = true;
      } else if (data !== undefined) {
        results.push(data);
      }
    });

    // Third call with 0 (falsy but not null)
    source(0, (end: boolean | null, data?: number) => {
      if (end === true) {
        completed = true;
      } else if (data !== undefined) {
        results.push(data);
      }
    });

    expect(results).toEqual([1, 2, 3]);
    expect(completed).toBe(false);
  });
});