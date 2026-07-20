import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream'

describe('values', () => {
  it('should handle null input and call callback with true', () => {
    const read = pull.values([1, 2, 3], () => {});
    read(null, (err, data) => {
      expect(err).toBeNull();
      expect(data).toBe(1);
    });
    read(null, (err, data) => {
      expect(err).toBeNull();
      expect(data).toBe(2);
    });
    read(null, (err, data) => {
      expect(err).toBeNull();
      expect(data).toBe(3);
    });
    read(null, (err, data) => {
      expect(err).toBe(true);
      expect(data).toBeUndefined();
    });
  });
});