import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should handle 4 arguments correctly', () => {
    const read = (end: any, cb: any) => cb(null, 1);
    const result = pull(read, (read: any) => read, (read: any) => read, (read: any) => read);
    result(null, (end: any, data: any) => {
      if (end === true) {
        throw new Error('Expected to not reach the end');
      }
    });
    result(null, (end: any, data: any) => {
      if (end === true) {
        throw new Error('Expected to not reach the end');
      }
    });
    result(null, (end: any, data: any) => {
      if (end === true) {
        throw new Error('Expected to not reach the end');
      }
    });
    result(null, (end: any, data: any) => {
      if (end === true) {
        throw new Error('Expected to not reach the end');
      }
    });
  });
});