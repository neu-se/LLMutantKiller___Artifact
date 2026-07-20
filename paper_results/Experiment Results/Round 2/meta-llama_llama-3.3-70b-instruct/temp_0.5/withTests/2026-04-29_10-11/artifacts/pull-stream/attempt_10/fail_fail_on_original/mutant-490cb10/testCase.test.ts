import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should not throw an error when a done callback is supplied', () => {
    const read = () => {
      return (abort: any, cb: any) => {
        cb(null, 'data');
      };
    };

    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink(read);
    expect(done).toHaveBeenCalledTimes(1);
  });
});