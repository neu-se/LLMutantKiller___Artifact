import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with two arguments', () => {
  it('should correctly handle partial application with exactly two arguments', (done) => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) cb(abort);
      else cb(null, 1);
    };

    const transform1 = (read: (abort: any, cb: (end: any, data?: any) => void) => void) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) cb(end);
          else cb(null, data * 2);
        });
      };
    };

    const transform2 = (read: (abort: any, cb: (end: any, data?: any) => void) => void) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) cb(end);
          else cb(null, data + 1);
        });
      };
    };

    const partialSink = pull(transform1, transform2);
    const result = partialSink(source);

    result(null, (end: any, data: any) => {
      expect(end).toBeNull();
      expect(data).toBe(3);
      done();
    });
  });
});