import { pull } from '../../../pull.js';

describe('pull function', () => {
  it('should not throw an error when called with a partial sink that is never called twice', () => {
    const read = pull(
      (read: any) => {
        return function (end: any, cb: any) {
          if (end) {
            cb(end);
          } else {
            cb(null, 1);
          }
        };
      },
      (read: any) => {
        let called = false;
        return function (end: any, cb: any) {
          if (called) {
            // This line should not be reached
          }
          called = true;
          read(end, cb);
        };
      }
    );

    expect(() => {
      read(null, () => {});
    }).not.toThrowError();
  });
});