import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should handle null args correctly', () => {
    const stream = pull(
      (read: any) => {
        return function (end: any, cb: any) {
          if (end) {
            cb(end);
          } else {
            cb(null, 1);
          }
        };
      }
    );

    expect(() => {
      stream(null, () => {});
    }).not.toThrowError();
  });
});