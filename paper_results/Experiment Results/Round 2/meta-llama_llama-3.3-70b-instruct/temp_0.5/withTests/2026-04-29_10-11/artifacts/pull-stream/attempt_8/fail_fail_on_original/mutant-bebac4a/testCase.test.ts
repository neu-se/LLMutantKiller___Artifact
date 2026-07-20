describe('drain', () => {
  it('should call read with abort when abort is called', () => {
    const read = jest.fn((abort: any, cb: any) => {
      if (abort) {
        throw new Error('Abort called');
      } else {
        cb(null, 'data');
      }
    });

    const sink = require('../../../../../../subject_repositories/pull-stream/sinks/drain.js').drain(null, null);
    sink(read);
    expect(() => sink.abort()).toThrowError('Abort called');
  });
});