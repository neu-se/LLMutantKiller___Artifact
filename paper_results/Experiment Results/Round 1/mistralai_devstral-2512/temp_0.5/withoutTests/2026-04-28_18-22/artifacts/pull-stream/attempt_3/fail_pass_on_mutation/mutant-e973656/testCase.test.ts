import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle end with truthy non-true value when done callback is missing', () => {
    const error = new Error('test error');
    let readCalled = false;
    let consoleWarnCalled = false;

    // Mock console.warn to track if it's called
    const originalWarn = console.warn;
    console.warn = (msg: any) => {
      consoleWarnCalled = true;
      expect(msg).toBeInstanceOf(Error);
      expect(msg.message).toBe('no done callback supplied');
    };

    const source = (abort: any, cb: (end: any) => void) => {
      readCalled = true;
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    // Test without done callback
    const sink = drain(null);

    expect(() => {
      sink(source);
    }).toThrow(error);

    expect(readCalled).toBe(true);
    expect(consoleWarnCalled).toBe(true);

    // Restore console.warn
    console.warn = originalWarn;
  });
});