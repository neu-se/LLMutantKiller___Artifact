import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should throw an error when called twice', () => {
    const partialSink = pull(
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, cb);
        };
      }
    );

    partialSink((end: any, cb: any) => {
      cb(null, 1);
    });

    expect(() => {
      partialSink((end: any, cb: any) => {
        cb(null, 1);
      });
    }).toThrowError(TypeError);
  });
});