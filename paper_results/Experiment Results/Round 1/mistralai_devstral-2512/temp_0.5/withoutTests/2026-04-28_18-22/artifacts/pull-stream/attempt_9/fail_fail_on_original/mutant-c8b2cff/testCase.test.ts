const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink', () => {
  it('should pass the correct value to read when op returns false and abort is set', () => {
    let readEndValue: any;
    const mockRead = (end: any, cb: (end?: any, data?: any) => void) => {
      readEndValue = end;
      cb(null, 'data');
    };

    const mockOp = (data: any) => false;
    const mockDone = () => {};

    const sink = drain(mockOp, mockDone);
    sink.abort('test-abort');
    sink(mockRead);

    // Original code: read(abort || true, ...) → read('test-abort', ...)
    // Mutated code: read(true, ...) → read(true, ...)
    // We need to verify the abort value was passed correctly
    expect(readEndValue).toBe('test-abort');
  });
});