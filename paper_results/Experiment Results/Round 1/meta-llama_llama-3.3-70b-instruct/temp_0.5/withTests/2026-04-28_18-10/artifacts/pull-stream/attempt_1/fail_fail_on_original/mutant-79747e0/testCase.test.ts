import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call done callback when end is true', (done) => {
    const callback = jest.fn();
    const d = drain((data) => data, callback);
    d(null, (end, data) => {
      if (end === true) {
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(null);
        done();
      }
    });
  });
});