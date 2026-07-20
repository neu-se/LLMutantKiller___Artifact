import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when end is false', (done) => {
    const read = jest.fn((err, cb) => {
      cb(false, null);
    });
    const doneCallback = jest.fn();
    const sink = drain(null, doneCallback);
    sink(read);
    expect(() => {
      sink(read);
    }).toThrow();
    done();
  });
});