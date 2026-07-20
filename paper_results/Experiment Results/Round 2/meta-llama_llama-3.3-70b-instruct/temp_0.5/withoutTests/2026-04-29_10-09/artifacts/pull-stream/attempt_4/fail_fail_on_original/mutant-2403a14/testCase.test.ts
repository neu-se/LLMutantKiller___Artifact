import * as throughModule from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through function', () => {
  it('should call onEnd with correct abort value', () => {
    let onEndCalled = false;
    let onEndAbortValue: any;

    const onEnd = (abort: any) => {
      onEndCalled = true;
      onEndAbortValue = abort;
    };

    const through = throughModule;
    const throughStream = through(null, onEnd);
    const read = (end: any, cb: any) => {
      cb(true, null);
    };

    const stream = throughStream(read);
    stream(true, () => {});

    expect(onEndCalled).toBe(true);
    expect(onEndAbortValue).toBeNull();

    onEndCalled = false;
    onEndAbortValue = undefined;

    stream(false, () => {});

    // The mutation changes the condition to abort === false, so onEnd should be called with null
    expect(onEndCalled).toBe(true);
    expect(onEndAbortValue).toBeNull();
  });
});