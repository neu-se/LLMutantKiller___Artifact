const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source', () => {
  it('should not abort when abort parameter is falsy', () => {
    const array = [1, 2, 3];
    const source = values(array);

    let firstCallEnd = null;
    let firstCallData = undefined;

    // Call with abort = false (falsy but not null/undefined)
    source(false, (end: boolean | null, data?: number) => {
      firstCallEnd = end;
      firstCallData = data;
    });

    // The mutation would cause this to abort immediately
    // In original code, it should return the first value
    expect(firstCallEnd).toBe(null);
    expect(firstCallData).toBe(1);
  });
});