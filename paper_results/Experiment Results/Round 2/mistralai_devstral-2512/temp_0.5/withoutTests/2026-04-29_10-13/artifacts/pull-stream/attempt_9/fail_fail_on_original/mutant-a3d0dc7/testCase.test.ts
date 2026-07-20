const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source', () => {
  it('should emit first value when called with non-abort parameter', () => {
    const array = [1, 2, 3];
    const source = values(array);

    let firstCallResult: { end: boolean | null, data?: number } | null = null;

    // Call with a truthy non-abort value (should not trigger abort)
    source("not an abort", (end: boolean | null, data?: number) => {
      firstCallResult = { end, data };
    });

    expect(firstCallResult).not.toBeNull();
    expect(firstCallResult!.end).toBe(null);
    expect(firstCallResult!.data).toBe(1);
  });
});