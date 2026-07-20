const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink', () => {
  it('should pass abort value to read when op returns false and abort is truthy', () => {
    let readEndValue: any;
    const mockRead = (end: any, cb: (end?: any, data?: any) => void) => {
      readEndValue = end;
      cb(null, 'data');
    };

    const mockOp = (data: any) => false;
    const mockDone = () => {};

    const sink = drain(mockOp, mockDone);
    sink.abort('custom-abort'); // Set a truthy abort value
    sink(mockRead);

    // In original code: read('custom-abort', ...)
    // In mutated code: read(true, ...)
    // The test should pass on original (receives 'custom-abort')
    // and fail on mutated (receives true)
    expect(readEndValue).toBe('custom-abort');
  });
});