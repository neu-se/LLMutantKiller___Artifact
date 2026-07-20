import { tmpdir } from 'os';
import { join } from 'path';
import { unlinkSync, existsSync } from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty flush behavior with multiple keys', () => {
  it('should call all callbacks when multiple keys are set before flush', (done) => {
    const dbPath = join(tmpdir(), `dirty-test-${Date.now()}-${Math.floor(Math.random() * 10000)}.db`);
    
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      const results: string[] = [];
      let callbackCount = 0;
      const expectedCallbacks = 3;
      
      const checkDone = () => {
        callbackCount++;
        if (callbackCount === expectedCallbacks) {
          // All callbacks were called - original behavior
          expect(results).toContain('key1');
          expect(results).toContain('key2');
          expect(results).toContain('key3');
          
          db.close();
          
          db.on('write_close', () => {
            if (existsSync(dbPath)) {
              try { unlinkSync(dbPath); } catch (e) {}
            }
            done();
          });
        }
      };
      
      // Set multiple keys - they should all be flushed
      db.set('key1', { value: 1 }, (err) => {
        expect(err).toBeNull();
        results.push('key1');
        checkDone();
      });
      
      db.set('key2', { value: 2 }, (err) => {
        expect(err).toBeNull();
        results.push('key2');
        checkDone();
      });
      
      db.set('key3', { value: 3 }, (err) => {
        expect(err).toBeNull();
        results.push('key3');
        checkDone();
      });
    });
    
    db.on('error', (err) => {
      done(err);
    });
    
    // Timeout to detect if callbacks are never called (mutant behavior)
    const timeout = setTimeout(() => {
      if (existsSync(dbPath)) {
        try { unlinkSync(dbPath); } catch (e) {}
      }
      done(new Error('Timeout: not all callbacks were called - likely mutant behavior where only first key is flushed per call'));
    }, 5000);
    
    // Clear timeout if done is called
    const originalDone = done;
  }, 6000);
});