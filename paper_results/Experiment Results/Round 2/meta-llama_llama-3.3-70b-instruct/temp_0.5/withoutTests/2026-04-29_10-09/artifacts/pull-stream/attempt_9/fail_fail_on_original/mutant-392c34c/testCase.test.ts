import { Readable } from 'stream';
const findModule = require('../../../../../../../../../subject_repositories/pull-stream/sinks/find.js');
const find = findModule.default || findModule;

describe('find function', () => {
  it('should handle errors correctly', (done) => {
    const readable = new Readable({
      read() {
        this.emit('error', true);
      }
    });

    find((err: any, data: any) => {
      expect(err).not.toBe(null);
      done();
    }, readable);
  });
});