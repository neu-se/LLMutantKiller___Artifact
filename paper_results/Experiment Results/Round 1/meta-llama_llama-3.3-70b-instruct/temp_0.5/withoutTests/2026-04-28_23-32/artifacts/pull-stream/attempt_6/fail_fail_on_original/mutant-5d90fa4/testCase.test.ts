import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should return an iterator that calls callback with true when array is null', () => {
    let called = false;
    const iterator = values(null, () => {});
    try {
      iterator(null, (err: any, value: any) => {
        if (err) throw err;
        if (value === true) {
          called = true;
        }
      });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
    expect(called).toBe(true);
  });
});