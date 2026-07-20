import { Readable } from 'stream';
const find = require('../../../../../../../../../subject_repositories/pull-stream/sinks/find');

describe('find function', () => {
  it('should handle errors correctly', (done) => {
    const readable = new Readable({
      read() {
        this.emit('error', false);
      }
    });

    find((err: any, data: any) => {
      expect(err).toBe(null);
      expect(data).toBe(null);
      done();
    })(readable);
  });
});