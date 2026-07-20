const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink', () => {
  it('should pass the correct abort value to read when op returns false', () => {
    let capturedEndValue: any;
    const mockRead = (end: any, cb: (end?: any, data?: any) => void) => {
      capturedEndValue = end;
      cb(null, 'data');
    };

    const mockOp = (data: any) => false;
    const mockDone = () => {};

    const sink = drain(mockOp, mockDone);
    sink.abort('custom-abort-value');
    sink(mockRead);

    // Original code passes (abort || true) which would be 'custom-abort-value'
    // Mutated code passes true directly
    expect(capturedEndValue).toBe('custom-abort-value');
  });
});