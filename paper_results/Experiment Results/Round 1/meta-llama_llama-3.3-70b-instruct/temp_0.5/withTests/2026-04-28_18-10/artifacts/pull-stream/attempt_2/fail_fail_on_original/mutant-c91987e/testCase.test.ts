import { drain } from '../../sinks/drain.js';

describe('drain', () => {
  it('should call the done callback when abort is called', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink.abort();
    expect(done).toHaveBeenCalledTimes(1);
  });
});