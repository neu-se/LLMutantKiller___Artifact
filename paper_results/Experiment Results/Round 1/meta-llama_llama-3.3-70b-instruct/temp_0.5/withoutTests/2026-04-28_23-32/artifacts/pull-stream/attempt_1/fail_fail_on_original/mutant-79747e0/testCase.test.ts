import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done callback only when provided', (done) => {
    let called = false;
    const doneCallback = () => {
      called = true;
    };
    const read = jest.fn((err, cb) => {
      cb(null, null);
    });
    drain(null, doneCallback);
    read();
    expect(called).toBe(true);
    called = false;
    drain(null, null);
    read();
    expect(called).toBe(false);
    done();
  });
});