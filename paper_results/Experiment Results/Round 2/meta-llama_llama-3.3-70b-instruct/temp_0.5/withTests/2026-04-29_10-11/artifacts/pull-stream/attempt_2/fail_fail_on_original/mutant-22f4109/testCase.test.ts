import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should throw an error when done is supplied', () => {
    const doneSpy = jest.fn();
    const drainInstance = drain(() => true, doneSpy);
    expect(() => drainInstance(null, () => {})).toThrowError();
  });
});