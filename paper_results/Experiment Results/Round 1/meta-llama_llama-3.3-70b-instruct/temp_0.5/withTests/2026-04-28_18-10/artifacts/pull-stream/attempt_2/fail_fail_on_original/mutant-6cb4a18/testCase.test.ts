import { infinite } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/infinite.js';

describe('infinite source', () => {
  it('should not end when end is false', (done) => {
    const read = infinite(() => Math.random());
    read(false, (end, data) => {
      expect(end).toBeNull();
      expect(data).not.toBeNull();
      done();
    });
  });
});