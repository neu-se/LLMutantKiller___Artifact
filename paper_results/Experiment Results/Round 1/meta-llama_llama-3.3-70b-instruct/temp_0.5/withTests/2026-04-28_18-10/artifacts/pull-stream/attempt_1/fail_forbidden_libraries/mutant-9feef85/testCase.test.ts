import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';
import { collect } from 'pull-collect';

describe('values', () => {
  it('should handle null input', (done) => {
    const read = values(null, () => {});
    read(null, (end, data) => {
      expect(end).toBeUndefined();
      expect(data).toBeUndefined();
      done();
    });
  });
});