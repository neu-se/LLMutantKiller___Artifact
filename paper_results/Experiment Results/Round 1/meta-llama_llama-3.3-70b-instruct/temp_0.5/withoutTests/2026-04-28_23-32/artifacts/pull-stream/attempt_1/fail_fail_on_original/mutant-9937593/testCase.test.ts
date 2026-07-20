import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain function', () => {
  it('should throw an error when done callback is not provided and an error occurs', () => {
    const read = jest.fn((err, cb) => {
      cb('error', null);
    });
    const sink = drain(null, null);
    expect(() => sink(read)).toThrowError('no done callback supplied');
  });
});