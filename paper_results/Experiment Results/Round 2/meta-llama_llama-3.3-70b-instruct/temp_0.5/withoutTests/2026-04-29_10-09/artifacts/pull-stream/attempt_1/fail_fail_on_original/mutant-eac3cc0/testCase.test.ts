import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done callback with null when op returns false', (done) => {
    const op = () => false;
    const doneCallback = jest.fn();
    const sink = drain(op, doneCallback);
    sink(null, () => {
      sink(null, () => {
        expect(doneCallback).toHaveBeenCalledTimes(1);
        expect(doneCallback).toHaveBeenCalledWith(null);
        done();
      });
    });
  });
});