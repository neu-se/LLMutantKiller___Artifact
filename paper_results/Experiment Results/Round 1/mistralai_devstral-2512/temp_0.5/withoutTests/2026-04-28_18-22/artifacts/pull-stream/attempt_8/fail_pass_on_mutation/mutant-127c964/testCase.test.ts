import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values source', () => {
  it('should handle non-array objects by converting them to arrays of values', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const source = values(obj);

    let firstCallEnd: any = null;
    let firstCallData: any = null;
    let secondCallEnd: any = null;
    let secondCallData: any = null;

    // First call
    source(null, (end: any, data: any) => {
      firstCallEnd = end;
      firstCallData = data;
    });

    // Second call
    source(null, (end: any, data: any) => {
      secondCallEnd = end;
      secondCallData = data;
    });

    // In the mutated version, both calls would return end=true immediately
    expect(firstCallEnd).toBe(null);
    expect(firstCallData).toBe(1);
    expect(secondCallEnd).toBe(null);
    expect(secondCallData).toBe(2);
  });
});