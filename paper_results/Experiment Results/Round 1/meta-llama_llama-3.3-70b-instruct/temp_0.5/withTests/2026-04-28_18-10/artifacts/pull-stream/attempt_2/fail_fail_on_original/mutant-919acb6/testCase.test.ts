import { drain } from '../../../sinks/drain.js';

describe('drain', () => {
  it('should call done with the error when end is not true', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink(null, () => {});
    sink(new Error('test error'), () => {
      expect(done).toHaveBeenCalledTimes(1);
      expect(done).toHaveBeenCalledWith(new Error('test error'));
    });
  });
});