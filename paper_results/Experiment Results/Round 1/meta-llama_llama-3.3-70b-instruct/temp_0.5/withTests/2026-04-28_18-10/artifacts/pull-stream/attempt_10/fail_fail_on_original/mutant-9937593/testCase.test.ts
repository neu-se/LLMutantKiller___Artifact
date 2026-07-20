import pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('drain', () => {
  it('should throw an error when end is an object and not true', () => {
    const done = jest.fn();
    const drainStream = pull.drain(() => true, done);
    const read = jest.fn((end, cb) => {
      cb({ foo: 'bar' }, null);
    });
    expect(() => drainStream(read)).toThrowError();
  });
});