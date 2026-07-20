import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should return an empty array when array is null or undefined', () => {
    const result = values(null, () => {});
    let ended = false;
    result(null, (err, value) => {
      if (value === true) {
        ended = true;
      }
    });
    expect(ended).toBe(true);
  });
});