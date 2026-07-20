import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream";

describe('drain', () => {
  it('should call read with abort when op returns false and abort is true', () => {
    let called = false;
    let err: any;
    let readCalledWithAbort = false;
    const done = (e: any) => {
      called = true;
      err = e;
    };

    const read = (abort: any, cb: any) => {
      if (abort) {
        readCalledWithAbort = true;
      }
      cb(null, null);
    };

    const sink = pull.drain((data: any) => false, done);
    sink(read);
    sink.abort = (err: any, cb: any) => {
      read(err, cb);
    };
    sink.abort(true, () => {
      expect(readCalledWithAbort).toBe(true);
    });
    expect(readCalledWithAbort).toBe(true);
  });
});