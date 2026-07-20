import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done with error when end is not true', (done) => {
    const error = new Error('Test error');
    const read = jest.fn((err, cb) => {
      cb(error, null);
    });
    const doneCallback = jest.fn();
    const sink = drainModule.default(null, doneCallback);
    sink(read);
    expect(doneCallback).toHaveBeenCalledTimes(1);
    expect(doneCallback).toHaveBeenCalledWith(error);
    done();
  });
});

// Additional test to check the condition
const error = new Error('Test error');
const read = (err, cb) => {
  cb(error, null);
};
const doneCallback = () => {
  throw new Error('doneCallback should not be called');
};
const sink = drainModule.default(null, doneCallback);
sink(read);