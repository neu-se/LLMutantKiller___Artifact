import * as throughModule from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through function', () => {
  it('should call onEnd with correct abort value', () => {
    let onEndCalled = false;
    let onEndAbortValue: any;

    const onEnd = (abort: any) => {
      onEndCalled = true;
      onEndAbortValue = abort;
    };

    const op = (data: any) => data;

    const read = (end: any, cb: (end: any, data: any) => void) => {
      cb(true, 'data');
    };

    const throughStream = throughModule.default(op, onEnd);
    const stream = throughStream(read);
    stream(true, () => {});

    expect(onEndCalled).toBe(true);
    expect(onEndAbortValue).toBeNull();
  });
});