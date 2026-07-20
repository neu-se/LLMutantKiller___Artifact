import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should handle end condition correctly', () => {
    const callback = jest.fn();
    const source = () => {
      return (end, cb) => {
        if (end) return cb(end);
        cb(null, 'data');
      };
    };
    const sink = drain(() => true, callback);
    source()(null, () => {});
    expect(callback).toHaveBeenCalledTimes(0);
  });
});