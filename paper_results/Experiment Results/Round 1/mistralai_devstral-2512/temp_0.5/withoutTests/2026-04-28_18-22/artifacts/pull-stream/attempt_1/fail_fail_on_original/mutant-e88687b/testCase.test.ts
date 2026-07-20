const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink abort functionality', () => {
  it('should handle abort with error callback correctly', (done) => {
    const mockRead = jest.fn((end, callback) => {
      if (end) {
        callback(end, null);
      } else {
        callback(null, 'data');
      }
    });

    const sink = drain(null, (err) => {
      expect(err).toBe('test error');
      done();
    });

    sink(mockRead);
    sink.abort('test error', (err) => {
      expect(err).toBe('test error');
    });
  });
});