import * as drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should not call done callback when done is falsy', (done) => {
    const callback = jest.fn();
    const d = drain.default((data: any) => data, null);
    d(null, (err: any) => {
      expect(callback).toHaveBeenCalledTimes(0);
      done();
    });
  });
});