import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should not throw an error when no done callback is supplied', () => {
    const drainInstance = drain(() => true);
    expect(() => drainInstance(null, () => {})).not.toThrowError();
  });
});