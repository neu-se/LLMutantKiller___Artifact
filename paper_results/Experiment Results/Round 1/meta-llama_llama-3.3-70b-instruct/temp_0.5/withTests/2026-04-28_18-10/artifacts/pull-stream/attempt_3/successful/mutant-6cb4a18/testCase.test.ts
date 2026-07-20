import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('infinite source', () => {
  it('should end when end is true', (done) => {
    const read = pull.infinite(() => Math.random());
    read(true, (end) => {
      expect(end).toBe(true);
      done();
    });
  });
});