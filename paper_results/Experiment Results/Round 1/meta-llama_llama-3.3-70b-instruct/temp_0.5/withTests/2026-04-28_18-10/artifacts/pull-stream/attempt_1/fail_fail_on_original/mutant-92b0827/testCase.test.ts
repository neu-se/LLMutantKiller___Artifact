import { reduce } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce', () => {
  it('should handle end immediately and no initial value', (done) => {
    const source = () => (end: any, cb: any) => {
      if (end) return cb(end);
      cb(null, 'data');
    };

    const result = reduce((acc: any, data: any) => data, null, (err: any, acc: any) => {
      if (err) done(err);
      else {
        if (acc !== 'data') done(new Error('Expected acc to be "data"'));
        else done();
      }
    });

    result(source());
  });
});