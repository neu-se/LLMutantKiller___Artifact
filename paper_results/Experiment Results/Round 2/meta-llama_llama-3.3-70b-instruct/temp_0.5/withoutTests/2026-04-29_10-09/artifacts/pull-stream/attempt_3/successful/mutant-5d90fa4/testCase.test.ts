import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should return an empty array when array is null or undefined', () => {
    const result = values(undefined, () => {});
    let ended = false;
    result(null, (err: any, value: any) => {
      if (value === true) {
        ended = true;
      }
    });
    result(null, (err: any, value: any) => {
      if (value === true) {
        ended = true;
      }
    });
    expect(ended).toBe(false);
  });
});