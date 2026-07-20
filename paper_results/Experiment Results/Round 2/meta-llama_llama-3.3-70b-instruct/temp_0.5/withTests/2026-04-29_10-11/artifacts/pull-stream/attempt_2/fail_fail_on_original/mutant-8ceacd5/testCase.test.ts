import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull.js', () => {
  it('should handle more than 4 arguments', () => {
    const read = pull(
      (read) => read,
      (read) => read,
      (read) => read,
      (read) => read,
      (read) => read
    );

    expect(typeof read).toBe('function');
  });
});