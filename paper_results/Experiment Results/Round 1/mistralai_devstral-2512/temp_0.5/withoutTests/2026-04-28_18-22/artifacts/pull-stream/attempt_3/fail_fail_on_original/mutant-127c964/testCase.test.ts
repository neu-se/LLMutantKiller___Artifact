import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values source', () => {
  it('should handle non-array objects by converting them to arrays of values', (done) => {
    const obj = { a: 1, b: 2, c: 3 };
    const source = values(obj);

    const results: number[] = [];
    let callCount = 0;

    source(null, (end: any, data: any) => {
      callCount++;
      if (end) {
        expect(callCount).toBeGreaterThan(1);
        expect(results).toEqual([1, 2, 3]);
        done();
      } else {
        results.push(data);
      }
    });
  });
});