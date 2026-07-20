import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should return an iterator that calls callback with true when array is null', () => {
    const iterator = values(null, () => {});
    let count = 0;
    iterator(null, (err: any, value: any) => {
      if (err) throw err;
      count++;
      if (value === true) {
        count++;
      }
    });
    iterator(null, (err: any, value: any) => {
      if (err) throw err;
      if (value !== true) {
        throw new Error('Expected true value');
      }
    });
    expect(count).toBe(2);
  });
});