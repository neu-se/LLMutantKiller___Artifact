import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle end with false value correctly', (done) => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(false);
    };

    const sink = drain((data: any) => {
      return false;
    }, (end: any) => {
      expect(end).toBe(false);
      done();
    });

    sink(source);
  });
});