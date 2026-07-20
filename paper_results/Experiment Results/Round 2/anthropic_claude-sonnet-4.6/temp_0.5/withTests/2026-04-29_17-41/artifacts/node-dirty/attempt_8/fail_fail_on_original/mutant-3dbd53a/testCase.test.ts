import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty write stream encoding option', () => {
  it('should create write stream with utf-8 encoding option', (done) => {
    const file = path.join(os.tmpdir(), `dirty-enc-spy-${Date.now()}.dirty`);
    const dirtyPath = require.resolve('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

    // Clear module cache so dirty.js re-requires fs fresh with our spy in place
    delete require.cache[dirtyPath];

    let capturedEncoding: string | undefined;

    const spy = jest.spyOn(fs, 'createWriteStream').mockImplementation((...args: any[]) => {
      const options = args[1];
      if (options && 'encoding' in options) {
        capturedEncoding = options.encoding;
      }
      spy.mockRestore();
      return fs.createWriteStream(args[0], options);
    });

    const Dirty = require(dirtyPath);
    const db = new Dirty(file);

    db.on('load', () => {
      try { fs.unlinkSync(file); } catch (_) {}
      delete require.cache[dirtyPath];
      expect(capturedEncoding).toBe('utf-8');
      done();
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch (_) {}
      delete require.cache[dirtyPath];
      done(err);
    });
  });
});