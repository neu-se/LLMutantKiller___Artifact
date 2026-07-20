import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should call callback with true when array is null', () => {
    let called = false;
    values(null, () => {});
    values(null, () => {})(null, (err, value) => {
      if (err) throw err;
      if (value === true) {
        called = true;
      }
    });
    expect(called).toBe(true);
  });
});