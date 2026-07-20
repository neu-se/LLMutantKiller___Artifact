import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should create read stream with utf-8 encoding so chunks are strings not buffers', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-spy-${process.pid}.db`);
    
    const content = JSON.stringify({key: 'x', val: 'y'}) + '\n';
    fs.writeFileSync(dbPath, content, 'utf-8');
    
    const originalCreateReadStream = fs.createReadStream.bind(fs);
    let capturedChunkIsString: boolean | null = null;
    
    (fs as any).createReadStream = (p: any, opts: any) => {
      const stream = originalCreateReadStream(p, opts);
      const originalOn = stream.on.bind(stream);
      (stream as any).on = (event: string, handler: any) => {
        if (event === 'data') {
          return originalOn(event, (chunk: any) => {
            capturedChunkIsString = typeof chunk === 'string';
            handler(chunk);
          });
        }
        return originalOn(event, handler);
      };
      return stream;
    };
    
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      (fs as any).createReadStream = originalCreateReadStream;
      try {
        expect(capturedChunkIsString).toBe(true);
        done();
      } catch (err) {
        done(err);
      } finally {
        try { fs.unlinkSync(dbPath); } catch (e) {}
      }
    });
    
    db.on('error', (err: Error) => {
      (fs as any).createReadStream = originalCreateReadStream;
      try { fs.unlinkSync(dbPath); } catch (e) {}
      done(err);
    });
  });
});