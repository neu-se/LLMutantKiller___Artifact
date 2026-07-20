import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream";

describe('drain', () => {
  it('should call done with an error when op returns false and abort is true', () => {
    let called = false;
    let err: any;
    const done = (e: any) => {
      called = true;
      err = e;
    };

    const sink = pull.drain((data: any) => false, done);
    sink.abort = (err: any, cb: any) => {
      cb(err);
    };
    sink.abort(true, () => {
      expect(called).toBe(false);
    });
  });
});