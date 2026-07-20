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
    // Check if the doneCallback is called with an error when the end is not true
    const read2 = jest.fn((err: any, cb: (end: any, data: any) => void) => {
      cb(new Error('Test error 2'), null);
    });
    const doneCallback2 = jest.fn();
    const sink2 = drainModule.default(null, () => {
      throw new Error('doneCallback should be called with an error');
    });
    expect(() => {
      sink2(read2);
    }).toThrowError('doneCallback should be called with an error');
    done();
  });
});