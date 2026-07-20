import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values source', () => {
  it('should handle non-array objects by converting them to arrays of values', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const source = values(obj);

    let firstCallEnd: any = null;
    let firstCallData: any = null;

    // First call should return first value
    source(null, (end: any, data: any) => {
      firstCallEnd = end;
      firstCallData = data;
    });

    // The mutation would cause this to be true immediately
    expect(firstCallEnd).toBe(null);
    expect(firstCallData).toBe(1);

    // Verify the source can be called multiple times
    let secondCallEnd: any = null;
    let secondCallData: any = null;

    source(null, (end: any, data: any) => {
      secondCallEnd = end;
      secondCallData = data;
    });

    expect(secondCallEnd).toBe(null);
    expect(secondCallData).toBe(2);
  });
});