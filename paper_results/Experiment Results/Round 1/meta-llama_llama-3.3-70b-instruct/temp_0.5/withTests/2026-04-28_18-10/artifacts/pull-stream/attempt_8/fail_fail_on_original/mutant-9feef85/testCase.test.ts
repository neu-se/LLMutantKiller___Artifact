import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('values', () => {
  it('should handle null input', (done) => {
    const read = values(null, (err: any) => {
      expect(err).toBeUndefined();
      done();
    });
    read(null, (end: any, data: any) => {
      expect(end).toBe(true);
      done();
    });
  });
});