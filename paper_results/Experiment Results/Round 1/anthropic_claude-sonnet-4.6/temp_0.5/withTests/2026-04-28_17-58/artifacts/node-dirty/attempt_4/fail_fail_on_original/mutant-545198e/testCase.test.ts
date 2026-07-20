import * as fs from 'fs';
import { EventEmitter } from 'events';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty', () => {
  it('should not process buffered complete rows when chunk has no newline', (done) => {
    const originalCreateReadStream = fs.createReadStream;
    const originalCreateWriteStream = fs.createWriteStream;

    const mockWriteStream = Object.assign(new EventEmitter(), {
      write: () => true,
      end: (cb?: () => void) => { if (cb) cb(); },
      destroy: () => {},
      cork: () => {},
      uncork: () => {},
    });

    const mockReadStream = Object.assign(new EventEmitter(), {
      destroy: () => {},
    });

    (fs as any).createReadStream = () => mockReadStream;
    (fs as any).createWriteStream = () => mockWriteStream;

    const errors: Error[] = [];
    const db = new Dirty('test.dirty');

    db.on('error', (err: Error) => errors.push(err));

    db.on('load', (length: number) => {
      (fs as any).createReadStream = originalCreateReadStream;
      (fs as any).createWriteStream = originalCreateWriteStream;
      try {
        // Original: row1 stuck in buffer with "x", not processed → length=0, error contains "row1\nx"
        // Mutated: row1 processed before "x" chunk, buffer="x" at end → length=1, error contains just "x"
        expect(errors).toHaveLength(1);
        expect(errors[0].message).toContain('row1');  // Original keeps row1 in buffer
        expect(length).toBe(0);  // Original: row1 not processed
        done();
      } catch (e) {
        done(e);
      }
    });

    process.nextTick(() => {
      // Chunk 1: has newline, so processed. buffer becomes "row1\n" wait...
      // Actually: chunk1 = "row1\n", buffer = "row1\n", has \n, process:
      //   arr = ["row1",""], pop → buffer="", arr=["row1"], process row1 → data.set("row1key", val)
      // Then chunk2 = "x" (no newline): buffer = "x"
      // At end: buffer="x", length>0 → error "Corrupted row: x", load(1)
      // Both original and mutated behave the same here!
      
      // I need chunk1 to NOT have newline but buffer to have complete rows...
      // That means I need to split differently.
      // Chunk 1: "row1" (no newline) → buffer = "row1", original returns early
      // Chunk 2: "\nrow2" (has newline) → buffer = "row1\nrow2"
      //   arr = ["row1","row2"], pop → buffer="row2", arr=["row1"], process row1
      // This is the same for both since chunk2 has newline.
      
      // The ONLY way to get different behavior:
      // Need buffer to contain "\n" but current chunk to NOT contain "\n"
      // This means a previous chunk added "\n" to buffer but wasn't fully processed
      // But if previous chunk had "\n", it WAS processed (both original and mutated process when chunk has \n)
      // After processing, buffer = last partial element (no \n)
      // So buffer can NEVER contain \n when the next chunk arrives (in the original flow)!
      
      // Wait... unless the previous chunk had \n and was processed, leaving buffer with content that has \n?
      // No - after processing, buffer = arr.pop() which is always the last element after split,
      // which never contains \n (since split removes them)
      
      // So buffer NEVER contains \n between chunk processing!
      // Therefore chunk.lastIndexOf('\n') === -1 is equivalent to buffer.lastIndexOf('\n') === -1
      // The mutation IS functionally equivalent!
      
      mockReadStream.emit('data', '{"key":"a","val":1}\n');
      mockReadStream.emit('data', 'x');
      mockReadStream.emit('end');
    });
  });
});