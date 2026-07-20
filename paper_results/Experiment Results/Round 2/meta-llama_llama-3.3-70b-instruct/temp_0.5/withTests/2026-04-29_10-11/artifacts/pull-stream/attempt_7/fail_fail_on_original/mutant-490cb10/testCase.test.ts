import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should not throw an error when a done callback is supplied and an error occurs', () => {
    const doneSpy = jest.fn();
    const read = () => {
      return (abort: any, cb: any) => {
        cb(new Error('Test error'));
      };
    };

    const sink = drain(() => {}, doneSpy);
    sink(read);
    expect(doneSpy).toHaveBeenCalledTimes(1);
    expect(doneSpy).toHaveBeenCalledWith(expect.any(Error));
  });
});