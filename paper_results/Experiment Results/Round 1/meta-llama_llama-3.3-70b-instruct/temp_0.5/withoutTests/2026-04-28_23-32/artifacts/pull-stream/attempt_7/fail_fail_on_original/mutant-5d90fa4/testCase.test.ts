import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should return an iterator that calls callback with true when array is null', () => {
    let called = false;
    const iterator = values(null, () => {});
    iterator(null, (err: any, value: any) => {
      if (err) throw err;
      if (value === true) {
        called = true;
      }
    });
    iterator(null, (err: any, value: any) => {
      if (err) throw err;
      if (value !== undefined) {
        throw new Error('Expected undefined value');
      }
    });
    expect(called).toBe(true);
  });
});