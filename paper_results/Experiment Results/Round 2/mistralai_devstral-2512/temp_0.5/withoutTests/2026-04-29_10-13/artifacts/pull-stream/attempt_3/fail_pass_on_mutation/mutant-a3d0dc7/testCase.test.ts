const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source', () => {
  it('should emit values when abort is not called', () => {
    const array = [1, 2, 3];
    const source = values(array);

    const results: number[] = [];
    let endCalled = false;

    // First call without abort
    source(null, (end: boolean | null, data?: number) => {
      if (end === true) {
        endCalled = true;
      } else if (end === null && data !== undefined) {
        results.push(data);
      }
    });

    // Second call without abort
    source(null, (end: boolean | null, data?: number) => {
      if (end === null && data !== undefined) {
        results.push(data);
      }
    });

    expect(results).toEqual([1, 2]);
    expect(endCalled).toBe(false);
  });
});