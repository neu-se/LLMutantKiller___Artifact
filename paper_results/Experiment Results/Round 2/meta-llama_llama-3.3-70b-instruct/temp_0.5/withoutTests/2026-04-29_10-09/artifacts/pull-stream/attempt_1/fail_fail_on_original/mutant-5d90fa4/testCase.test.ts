import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should return an empty array when array is null or undefined', () => {
    const result = values(null, () => {});
    let count = 0;
    result(null, (err, value) => {
      if (err) {
        throw err;
      }
      if (value === true) {
        count++;
      }
    });
    expect(count).toBe(1);
  });
});