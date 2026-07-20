import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when end is an object that is not true', (done) => {
    const read = jest.fn((err, cb) => {
      cb({}, null);
    });
    const sink = drainModule.default(null, null);
    expect(() => {
      sink(read);
    }).toThrowError();
    done();
  });
});