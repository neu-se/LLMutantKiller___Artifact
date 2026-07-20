import { createWriteStream } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { rmSync, existsSync } from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty error emission without callbacks', () => {
  it('should emit error event when write fails and there are no callbacks for the key', (done) => {
    const tmpPath = join(tmpdir(), `dirty-test-${Date.now()}.db`);
    
    const db = new Dirty(tmpPath);
    
    db.on('load', () => {
      const errorSpy = jest.fn();
      db.on('error', errorSpy);
      
      // Set a value without a callback - cbs will be empty array
      db.set('testKey', { value: 'testValue' });
      
      // Destroy the write stream to cause a write error
      // We need to do this after the cork but during the write
      const originalWrite = db._writeStream.write.bind(db._writeStream);
      db._writeStream.write = (data, encoding, callback) => {
        // Destroy the stream to cause an error
        db._writeStream.destroy(new Error('Simulated write error'));
        if (callback) callback(new Error('Simulated write error'));
        return false;
      };
      
      // Trigger flush again
      db._flush();
      
      setTimeout(() => {
        expect(errorSpy).toHaveBeenCalled();
        if (existsSync(tmpPath)) rmSync(tmpPath);
        done();
      }, 200);
    });
  });
});