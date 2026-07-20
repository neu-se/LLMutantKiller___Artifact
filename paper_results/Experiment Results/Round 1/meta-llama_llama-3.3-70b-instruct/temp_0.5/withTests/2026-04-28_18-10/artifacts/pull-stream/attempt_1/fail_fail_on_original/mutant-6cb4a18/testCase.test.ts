import { infinite } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/infinite.js';

describe('infinite source', () => {
  it('should end when end is true', (done) => {
    const read = infinite(() => Math.random());
    read(true, (end) => {
      expect(end).toBe(true);
      done();
    });
  });
});