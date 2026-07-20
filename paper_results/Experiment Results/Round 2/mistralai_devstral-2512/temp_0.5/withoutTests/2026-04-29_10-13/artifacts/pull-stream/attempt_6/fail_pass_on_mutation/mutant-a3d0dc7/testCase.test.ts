const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source', () => {
  it('should not abort when called with non-abort parameters', () => {
    const array = [1, 2, 3];
    const source = values(array);

    let callCount = 0;
    const results: number[] = [];

    // Call multiple times with null (no abort)
    for (let i = 0; i < 4; i++) {
      source(null, (end: boolean | null, data?: number) => {
        callCount++;
        if (end === true) {
          // Should complete after all values
          expect(callCount).toBe(4);
          expect(results).toEqual([1, 2, 3]);
        } else if (data !== undefined) {
          results.push(data);
        }
      });
    }
  });
});