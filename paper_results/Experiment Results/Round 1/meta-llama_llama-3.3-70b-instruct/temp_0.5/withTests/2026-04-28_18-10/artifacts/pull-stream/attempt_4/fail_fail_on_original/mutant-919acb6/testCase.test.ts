import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream/index.js';

describe('drain', () => {
  it('should call done with null when end is true and not false', () => {
    const done = jest.fn();
    const sink = pull.drain(() => true, done);
    sink(null, () => {});
    sink(true, () => {
      expect(done).toHaveBeenCalledTimes(1);
      expect(done).toHaveBeenCalledWith(null);
    });
    sink(false, () => {
      expect(done).toHaveBeenCalledTimes(2);
      expect(done).toHaveBeenNthCalledWith(2, false);
    });
  });
});