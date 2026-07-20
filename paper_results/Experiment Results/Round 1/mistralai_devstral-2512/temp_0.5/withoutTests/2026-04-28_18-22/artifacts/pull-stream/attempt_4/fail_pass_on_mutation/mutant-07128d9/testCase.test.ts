import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain mutation test', () => {
  it('should throw error when done callback is not provided', () => {
    const error = new Error('test error');
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(error, 'data');
    };

    expect(() => {
      const sink = drain(null);
      sink(source);
    }).toThrow();
  });
});