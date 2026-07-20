import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should throw error when end is false and no done callback', () => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(false, 'data');
    };

    const sink = drain((data: any) => {
      return false;
    });

    expect(() => {
      sink(source);
    }).toThrow();
  });
});