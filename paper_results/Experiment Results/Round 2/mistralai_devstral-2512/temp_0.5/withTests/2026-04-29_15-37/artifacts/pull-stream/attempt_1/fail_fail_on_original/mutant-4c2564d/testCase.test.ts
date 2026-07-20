import { createReadStream } from 'fs';
import { join } from 'path';
import pull from '../';

describe('prop with regexp', () => {
  it('should return the matched substring when using a regexp key', (done) => {
    const testString = 'hello world';
    const regex = /world/;
    const propFn = require('../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js')(regex);

    pull(
      pull.values([testString]),
      pull.map(propFn),
      pull.collect((err, results) => {
        expect(err).toBeNull();
        expect(results).toEqual(['world']);
        done();
      })
    );
  });
});