import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should return an empty array when no array is provided', () => {
    const result = values(null, () => {});
    let called = false;
    result(null, (err, value) => {
      if (err) throw err;
      if (value === undefined) {
        called = true;
      }
    });
    expect(called).toBe(true);
  });
});