import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should handle null args correctly', () => {
    const stream = pull(
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, cb);
        };
      }
    );

    expect(() => {
      stream(null, () => {});
    }).not.toThrowError();
  });
});