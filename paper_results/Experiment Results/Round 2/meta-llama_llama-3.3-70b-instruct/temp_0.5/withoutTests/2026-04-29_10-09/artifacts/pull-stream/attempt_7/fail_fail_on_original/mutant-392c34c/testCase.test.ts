import { Readable } from 'stream';
const find = require('../../../../../../../../../subject_repositories/pull-stream/sinks/find.js').default;

describe('find function', () => {
  it('should handle errors correctly', (done) => {
    const readable = new Readable({
      read() {
        this.emit('error', false);
      }
    });

    find((err: any) => {
      expect(err).toBe(null);
      done();
    }, readable);
  });
});