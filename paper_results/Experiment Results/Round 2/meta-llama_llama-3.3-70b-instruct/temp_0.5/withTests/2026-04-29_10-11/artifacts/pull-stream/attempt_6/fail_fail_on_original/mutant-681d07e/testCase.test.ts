import { pull } from '../../../pull.js';

describe('pull function', () => {
  it('should handle a partial sink correctly', () => {
    const stream = pull(
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
            cb(new TypeError("partial sink should only be called once!"));
          } else {
            called = true;
            read(end, cb);
          }
        };
      }
    );

    expect(() => {
      stream(null, () => {});
      stream(null, () => {});
    }).toThrowError(TypeError);
  });
});