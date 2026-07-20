import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle end with false value by throwing error when no done callback', () => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(false);
    };

    const sink = drain((data: any) => {
      return false;
    });

    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      sink(source);
    }).toThrow();

    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});