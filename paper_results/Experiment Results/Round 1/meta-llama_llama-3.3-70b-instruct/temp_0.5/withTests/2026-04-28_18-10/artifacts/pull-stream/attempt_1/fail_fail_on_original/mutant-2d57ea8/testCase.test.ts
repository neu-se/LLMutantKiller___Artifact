import { pull } from '../../../pull.js';

describe('pull-stream', () => {
  it('should throw an error with a message when called twice', () => {
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

    expect(() => {
      stream((end: any, cb: any) => {
        cb(null, 'data');
      });
      stream((end: any, cb: any) => {
        cb(null, 'data');
      });
    }).toThrowError('partial sink should only be called once!');
  });
});