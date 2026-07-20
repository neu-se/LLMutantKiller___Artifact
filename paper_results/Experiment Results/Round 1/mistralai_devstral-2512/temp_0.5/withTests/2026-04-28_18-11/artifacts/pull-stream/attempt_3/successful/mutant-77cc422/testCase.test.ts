const pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js');
const count = require('../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js');

describe('count source end handling', () => {
  it('should properly handle end signal and call callback', (done) => {
    const source = count(5);
    let callbackInvoked = false;

    source(true, (end: any, data: any) => {
      callbackInvoked = true;
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      done();
    });

    expect(callbackInvoked).toBe(true);
  });
});