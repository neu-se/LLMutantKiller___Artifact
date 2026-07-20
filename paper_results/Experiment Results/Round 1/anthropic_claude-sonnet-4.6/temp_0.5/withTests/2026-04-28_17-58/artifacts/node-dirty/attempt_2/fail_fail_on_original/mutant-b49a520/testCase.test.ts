import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';

describe('dirty', () => {
  it('should correctly handle empty data chunks during file loading', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-empty-chunk-${Date.now()}.dirty`);
    
    // Create the file so _writeStream can be created
    fs.writeFileSync(file, '', 'utf-8');
    
    const originalCreateReadStream = fs.createReadStream;
    let intercepted = false;
    
    (fs as any).createReadStream = function(filePath: string, options: any) {
      if (filePath === file && !intercepted) {
        intercepted = true;
        const emitter = new EventEmitter() as any;
        emitter.destroy = () => {};
        
        const row1 = JSON.stringify({ key: 'key1', val: 'val1' });
        const row2 = JSON.stringify({ key: 'key2', val: 'val2' });
        
        process.nextTick(() => {
          // Deliver row1 with newline, then partial row2
          emitter.emit('data', row1 + '\n' + row2.slice(0, 5));
          // Deliver rest of row2 without newline
          emitter.emit('data', row2.slice(5));
          // Deliver just the newline
          emitter.emit('data', '\n');
          emitter.emit('end');
          emitter.emit('close');
        });
        
        return emitter;
      }
      return originalCreateReadStream.call(fs, filePath, options);
    };
    
    // Clear require cache
    const dirtyCachePath = require.resolve('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    delete require.cache[dirtyCachePath];
    const Dirty = require(dirtyCachePath);
    
    (fs as any).createReadStream = originalCreateReadStream;
    
    const db = new Dirty(file);
    
    const errors: Error[] = [];
    db.on('error', (err: Error) => errors.push(err));
    
    db.on('load', (length: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(length).toBe(2);
        expect(db.get('key1')).toBe('val1');
        expect(db.get('key2')).toBe('val2');
        fs.unlinkSync(file);
        done();
      } catch (err) {
        try { fs.unlinkSync(file); } catch (_) {}
        done(err);
      }
    });
  });
});