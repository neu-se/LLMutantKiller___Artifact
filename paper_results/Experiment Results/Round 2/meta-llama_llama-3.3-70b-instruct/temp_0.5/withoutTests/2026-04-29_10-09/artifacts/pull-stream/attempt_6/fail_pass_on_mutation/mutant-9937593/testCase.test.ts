import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done with error when end is not true', (done) => {
    const error = new Error('Test error');
    const read = jest.fn((err: any, cb: (end: any, data: any) => void) => {
      cb(error, null);
    });
    const doneCallback = jest.fn();
    const sink = drainModule.default(null, doneCallback);
    sink(read);
    expect(doneCallback).toHaveBeenCalledTimes(1);
    expect(doneCallback).toHaveBeenCalledWith(error);
    // Add an additional check to see if the doneCallback is called with an error
    // when the end is not true, but the condition is met in the mutated code
    const read2 = jest.fn((err: any, cb: (end: any, data: any) => void) => {
      cb(true, null);
    });
    const sink2 = drainModule.default(null, doneCallback);
    sink2(read2);
    expect(doneCallback).toHaveBeenCalledTimes(2);
    expect(doneCallback).toHaveBeenNthCalledWith(2, null);
    done();
  });
});