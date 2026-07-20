import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain';

describe('drain', () => {
  it('should call done with error when end is not true', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink(null, (end, data) => {
      end = { foo: 'bar' };
      sink(end, () => {});
      expect(done).toHaveBeenCalledTimes(1);
      expect(done).toHaveBeenCalledWith(end);
    });
  });
});