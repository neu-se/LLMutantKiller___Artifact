import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js'

describe('values', () => {
  it('should handle null input', () => {
    const read = values(null, () => {});
    read(null, (err, data) => {
      expect(err).toBeUndefined();
      expect(data).toBeUndefined();
    });
  });
});