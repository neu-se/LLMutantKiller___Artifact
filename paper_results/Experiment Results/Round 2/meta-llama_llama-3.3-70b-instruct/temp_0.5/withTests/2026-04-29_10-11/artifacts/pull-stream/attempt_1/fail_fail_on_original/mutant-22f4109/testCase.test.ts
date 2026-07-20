import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should call done callback when no done callback is supplied', () => {
    const doneSpy = jest.fn();
    const drainInstance = drain(() => true, doneSpy);
    drainInstance(null, () => {});
    expect(doneSpy).toHaveBeenCalledTimes(1);
  });
});