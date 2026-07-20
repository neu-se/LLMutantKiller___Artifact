import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream'

describe('values', () => {
  it('should handle null input and call callback with true', () => {
    const read = pull.values(null, () => {});
    read(null, (err, data) => {
      expect(err).toBe(true);
      expect(data).toBeUndefined();
    });
  });
});