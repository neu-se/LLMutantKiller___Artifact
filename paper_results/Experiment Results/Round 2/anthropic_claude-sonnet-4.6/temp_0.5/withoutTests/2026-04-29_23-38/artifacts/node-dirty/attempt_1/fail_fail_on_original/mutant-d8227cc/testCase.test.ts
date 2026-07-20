import * as fs from 'fs';
import { EventEmitter } from 'events';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database', () => {
  it('should correctly process a chunk where the last newline is at index 1', (done) => {
    const originalCreateReadStream = fs.createReadStream;
    const originalCreateWriteStream = fs.createWriteStream;
    
    // Mock write stream
    const mockWriteStream = new EventEmitter() as any;
    mockWriteStream.write = () => false;
    mockWriteStream.end = (cb: any) => { if (cb) cb(); };
    mockWriteStream.destroy = () => {};
    mockWriteStream.cork = () => {};
    mockWriteStream.uncork = () => {};
    
    // Mock read stream that emits chunks
    const mockReadStream = new EventEmitter() as any;
    mockReadStream.destroy = () => {};
    
    (fs as any).createReadStream = () => mockReadStream;
    (fs as any).createWriteStream = () => mockWriteStream;
    
    const db = new Dirty('/fake/path');
    
    db.on('load', (count: number) => {
      (fs as any).createReadStream = originalCreateReadStream;
      (fs as any).createWriteStream = originalCreateWriteStream;
      
      try {
        expect(count).toBe(1);
        expect(db.get('hello')).toBe(42);
        done();
      } catch (e) {
        done(e);
      }
    });
    
    db.on('error', (err: Error) => {
      (fs as any).createReadStream = originalCreateReadStream;
      (fs as any).createWriteStream = originalCreateWriteStream;
      done(err);
    });
    
    // Emit the JSON row split into chunks where last chunk has lastIndexOf('\n') === 1
    // Row: {"key":"hello","val":42}\n
    // Split: chunk1 = '{"key":"hello","val":4', chunk2 = '2}\n'
    // chunk2: lastIndexOf('\n') === 2, not 1
    
    // Need chunk where lastIndexOf('\n') === 1
    // chunk = "x\n" where x is end of JSON
    // Row: {"key":"hello","val":42}\n
    // chunk1 = '{"key":"hello","val":42', chunk2 = '}\n'
    // chunk2: lastIndexOf('\n') === 1 ✓
    
    process.nextTick(() => {
      mockReadStream.emit('data', '{"key":"hello","val":42');
      mockReadStream.emit('data', '}\n');
      mockReadStream.emit('end');
      mockReadStream.emit('close');
    });
  });
});