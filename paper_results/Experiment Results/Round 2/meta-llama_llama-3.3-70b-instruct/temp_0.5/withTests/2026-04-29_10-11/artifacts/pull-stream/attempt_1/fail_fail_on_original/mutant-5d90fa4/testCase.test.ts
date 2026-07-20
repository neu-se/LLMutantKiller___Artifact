import { values } from '../../../../../../../../subject_repositories/pull-stream/sources/values';

describe('values', () => {
  it('should return an empty array when input is falsy', () => {
    const result = values(null);
    let called = false;
    result(null, (err, data) => {
      called = true;
      expect(err).toBeNull();
      expect(data).toBeUndefined();
    });
    expect(called).toBe(true);
  });
});