import { reduce } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce', () => {
  it('should pass when end is true and no initial value', (done) => {
    const source = () => (end: any, cb: any) => {
      cb(true, null);
    };

    const result = reduce((acc: any, data: any) => data, (err: any, acc: any) => {
      if (err!== null) done(new Error('Expected error to be null'));
      else if (acc!== undefined) done(new Error('Expected acc to be undefined'));
      else done();
    });

    result(source());
  });
});