import * as drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call done callback when end is true', (done) => {
    const callback = jest.fn();
    const d = drain.default((data: any) => data, callback);
    d(null, (end: any, data: any) => {
      if (end === true) {
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(null);
        done();
      }
    });
  });
});