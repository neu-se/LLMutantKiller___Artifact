import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through function', () => {
  it('should call onEnd with correct abort value', () => {
    let onEndCalled = false;
    let onEndAbortValue: any;

    const onEnd = (abort: any) => {
      onEndCalled = true;
      onEndAbortValue = abort;
    };

    const throughStream = through(null, onEnd);
    const read = (end: any, cb: any) => {
      cb(true, null);
    };

    const stream = throughStream(read);
    stream(false, () => {});

    expect(onEndCalled).toBe(true);
    expect(onEndAbortValue).not.toBeNull();
  });
});