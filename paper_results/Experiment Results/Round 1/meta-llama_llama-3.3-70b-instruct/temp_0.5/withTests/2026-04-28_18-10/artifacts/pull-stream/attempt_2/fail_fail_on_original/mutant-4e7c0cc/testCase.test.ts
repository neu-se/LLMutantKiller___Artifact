import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should handle 4 arguments correctly', () => {
    const read = (end, cb) => cb(null, 1);
    const result1 = pull(read, (read) => read, (read) => read, (read) => read);
    expect(result1).toBeInstanceOf(Function);
  });
});