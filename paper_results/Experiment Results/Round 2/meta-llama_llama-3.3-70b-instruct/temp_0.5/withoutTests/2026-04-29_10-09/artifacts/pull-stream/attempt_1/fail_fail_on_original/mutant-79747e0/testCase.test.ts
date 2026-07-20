import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done callback with correct arguments when end is true', () => {
    let doneCalled = false;
    let doneArgument: any;
    const done = (err: any) => {
      doneCalled = true;
      doneArgument = err;
    };

    const read = jest.fn((err: any, cb: any) => {
      cb(true, null);
    });

    const sink = drain(null, done);
    sink(read);

    expect(doneCalled).toBe(true);
    expect(doneArgument).toBeNull();
  });
});