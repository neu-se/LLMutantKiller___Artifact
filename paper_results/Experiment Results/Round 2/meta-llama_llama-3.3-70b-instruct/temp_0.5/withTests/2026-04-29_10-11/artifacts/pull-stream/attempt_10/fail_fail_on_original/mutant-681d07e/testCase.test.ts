import { pull } from '../../../pull.js';

describe('pull function', () => {
  it('should throw an error when a partial sink is called twice', () => {
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
            throw new TypeError("partial sink should only be called once!");
          }
          called = true;
          read(end, cb);
        };
      }
    );

    expect(() => {
      read(null, () => {});
      read(null, () => {});
    }).toThrowError(TypeError);
  });
});