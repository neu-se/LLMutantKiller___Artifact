import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should pass when the original code is used and fail when the mutated code is used', () => {
    const op = (data: any) => true;
    const done = (err: any) => {
      if (err) {
        throw err;
      }
    };

    const read = (err: any, cb: (end: any, data: any) => void) => {
      if (err === true) {
        cb(true, null);
      } else {
        cb(null, 'data');
      }
    };

    const sink = drain(op, done);
    sink(read);

    // To detect the mutation, we need to check if the read function is called with the correct error value.
    // We can do this by using a spy function to track the calls to the read function.
    const readSpy = jest.fn(read);
    const sinkWithSpy = drain(op, done);
    sinkWithSpy(readSpy);

    // If the mutation is present, the read function will be called with true instead of the abort value.
    // So, we expect the readSpy to be called with true as the first argument.
    expect(readSpy).toHaveBeenCalledTimes(1);
    expect(readSpy).toHaveBeenCalledWith(true, expect.any(Function));
  });
});