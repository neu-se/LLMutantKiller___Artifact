import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should return an iterator that calls callback with true when array is null', () => {
    let calledWithNull = false;
    let calledWithTrue = false;
    const iterator = values(null, () => {});
    iterator(null, (err: any, value: any) => {
      if (err) throw err;
      if (value === null) {
        calledWithNull = true;
      } else if (value === true) {
        calledWithTrue = true;
      }
    });
    iterator(null, (err: any, value: any) => {
      if (err) throw err;
      if (value === null) {
        calledWithNull = true;
      } else if (value === true) {
        calledWithTrue = true;
      }
    });
    expect(calledWithTrue).toBe(true);
    expect(calledWithNull).toBe(false);
  });
});