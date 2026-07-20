import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js');
const count = require('../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js');

describe('count source behavior on end signal', () => {
  it('should call callback with end signal when end is truthy', (done) => {
    const source = count(5);
    let endCalled = false;

    source(true, (end, data) => {
      endCalled = true;
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      done();
    });

    expect(endCalled).toBe(true);
  });
});