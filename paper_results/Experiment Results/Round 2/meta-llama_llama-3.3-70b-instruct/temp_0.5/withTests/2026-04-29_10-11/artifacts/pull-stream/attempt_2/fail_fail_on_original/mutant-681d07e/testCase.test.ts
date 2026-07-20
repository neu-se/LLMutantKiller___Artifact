import { pull } from '../../../pull.js';

describe('pull function', () => {
  it('should throw an error when called twice with a partial sink', () => {
    const stream = pull(
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, cb);
        };
      },
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, cb);
        };
      }
    );

    expect(() => stream(null, () => {})).toThrowError(TypeError);
  });
});