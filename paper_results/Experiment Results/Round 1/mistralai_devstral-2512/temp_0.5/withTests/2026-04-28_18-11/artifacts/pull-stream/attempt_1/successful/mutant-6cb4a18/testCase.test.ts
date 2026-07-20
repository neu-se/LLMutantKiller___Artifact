import { createReadStream } from 'fs';
import { join } from 'path';
import pull from '../';

describe('infinite source with end signal', () => {
  it('should call callback with end error when end is truthy', (done) => {
    const endError = new Error('test end');
    const infinite = require('../../../../../../../../../../../subject_repositories/pull-stream/sources/infinite.js');

    const source = infinite();
    source(endError, (err) => {
      expect(err).toBe(endError);
      done();
    });
  });
});