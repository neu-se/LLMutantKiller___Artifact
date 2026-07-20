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
      cb(new Error('Test error 2'), null);
    });
    const doneCallback2 = jest.fn();
    const sink2 = drainModule.default(null, doneCallback2);
    sink2(read2);
    expect(doneCallback2).toHaveBeenCalledTimes(1);
    expect(doneCallback2).toHaveBeenCalledWith(new Error('Test error 2'));
    // Check if the doneCallback is called with null when the end is true
    const read3 = jest.fn((err: any, cb: (end: any, data: any) => void) => {
      cb(true, null);
    });
    const doneCallback3 = jest.fn();
    const sink3 = drainModule.default(null, doneCallback3);
    sink3(read3);
    expect(doneCallback3).toHaveBeenCalledTimes(1);
    expect(doneCallback3).toHaveBeenCalledWith(null);
    // Check if the doneCallback is called with an error when the end is not true
    const read4 = jest.fn((err: any, cb: (end: any, data: any) => void) => {
      cb(new Error('Test error 3'), null);
    });
    const doneCallback4 = jest.fn();
    const sink4 = drainModule.default(null, doneCallback4);
    sink4(read4);
    expect(doneCallback4).toHaveBeenCalledTimes(1);
    expect(doneCallback4).toHaveBeenCalledWith(new Error('Test error 3'));
    done();
  });
});