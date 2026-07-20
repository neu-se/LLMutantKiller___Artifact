import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream";

describe('drain', () => {
  it('should call read with abort when op returns false and abort is true', () => {
    let readCalledWithAbort = false;
    const read = (abort: any, cb: any) => {
      if (abort && abort === true) {
        readCalledWithAbort = true;
      }
      cb(null, null);
    };

    const sink = pull.drain((data: any) => false, () => {});
    sink(read);
    sink.abort(true, () => {});
    expect(readCalledWithAbort).toBe(true);
  });
});