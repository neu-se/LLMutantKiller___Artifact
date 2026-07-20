import { drain } from '../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call read with abort when abort is called', () => {
    const read = jest.fn((abort: any, cb: any) => {
      if (abort) {
        expect(read).toHaveBeenCalledTimes(2);
      }
      cb(null, 'data');
    });

    const sink = drain(null, null);
    sink(read);
    sink.abort();
  });
});