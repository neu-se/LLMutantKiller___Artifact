import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should return an iterator that calls callback with true when array is null', () => {
    const iterator = values(null, () => {});
    let called = false;
    iterator(null, (err: any, value: any) => {
      if (err) throw err;
      if (value === true) {
        called = true;
      }
    });
    expect(called).toBe(true);
  });
});