import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

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

    const originalError = new Error('partial sink should only be called once!');

    expect(() => {
      stream((end: any, cb: any) => {
        cb(null, 'data');
      });
      stream((end: any, cb: any) => {
        cb(null, 'data');
      });
    }).toThrowError(originalError.message);
  });
});