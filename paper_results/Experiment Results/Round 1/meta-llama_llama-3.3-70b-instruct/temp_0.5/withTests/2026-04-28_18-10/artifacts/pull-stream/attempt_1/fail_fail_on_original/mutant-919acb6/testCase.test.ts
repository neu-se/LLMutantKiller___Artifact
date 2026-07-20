import { drain } from '../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should throw an error when end is not true and not false', () => {
    const done = jest.fn();
    const sink = drain(() => true, done);
    sink(null, () => {});
    sink(false, () => {
      expect(done).toHaveBeenCalledTimes(1);
      expect(done).toHaveBeenCalledWith(false);
    });
  });
});