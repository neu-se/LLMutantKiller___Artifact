import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain', () => {
  it('should handle end condition correctly', () => {
    const done = jest.fn();
    const sink = drain(() => true, done);
    sink(null, (end: any, data: any) => {
      if (end) {
        expect(end).toBe(true);
        expect(data).toBeUndefined();
        done();
      }
    });
    expect(done).toHaveBeenCalledTimes(1);
  });

  it('should handle end condition with end === true correctly', () => {
    const done = jest.fn();
    const sink = drain(() => false, done);
    sink(true, (end: any, data: any) => {
      if (end) {
        expect(end).toBe(true);
        expect(data).toBeUndefined();
        done();
      }
    });
    expect(done).toHaveBeenCalledTimes(1);
  });

  it('should call done with error when end is not true and not null', () => {
    const done = jest.fn();
    const sink = drain(() => true, done);
    const error = new Error('Test error');
    sink(error, (end: any, data: any) => {
      expect(end).toBe(error);
      expect(data).toBeUndefined();
      done();
    });
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(error);
  });
});