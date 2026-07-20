import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import { Readable } from 'stream';

describe('find function', () => {
  it('should handle errors correctly', (done) => {
    const readable = new Readable({
      read() {
        this.emit('error', true);
      }
    });

    find(readable, (err: any, data: any) => {
      expect(err).toBe(null);
      expect(data).toBe(null);
      done();
    });
  });
});