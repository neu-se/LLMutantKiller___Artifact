import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should handle 4 arguments correctly', () => {
    const read = (end: any, cb: any) => cb(null, 1);
    const result1 = pull(read, (read: any) => read, (read: any) => read, (read: any) => read);
    expect(result1).toBeInstanceOf(Function);
  });
});