import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty drain event', () => {
  it('drain should not fire while items remain in the write queue', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-queue-test-${process.pid}.dirty`);
    try { fs.unlinkSync(tmpFile); } catch (_) {}

    // Create a write stream with tiny highWaterMark by writing to a file
    // then replacing the write stream
    const db = new Dirty(tmpFile);

    db.on('load', () => {
      // Replace the write stream with one that has tiny highWaterMark
      // to force backpressure
      if (db._writeStream) {
        db._writeStream.end();
      }
      db._writeStream = fs.createWriteStream(tmpFile, {
        encoding: 'utf-8',
        flags: 'a',
        highWaterMark: 1, // Force backpressure after every byte
      });

      db._writeStream.on('drain', () => {
        db._waitForDrain = false;
        if (!db._queue.size) {
          // nothing
        } else {
          if (db._inFlightWrites <= 0) db.emit('drain');
          db._flush();
        }
      });

      db._writeStream.on('close', () => {
        db._writeStream = null;
        db.emit('write_close');
      });

      let drainFiredWithQueueItems = false;
      const origEmit = db.emit.bind(db);
      db.emit = function(event: string, ...args: any[]) {
        if (event === 'drain') {
          if (db._queue && db._queue.size > 0) {
            drainFiredWithQueueItems = true;
          }
        }
        return origEmit(event, ...args);
      };

      const NUM_KEYS = 30;
      let callbacksFired = 0;

      for (let i = 0; i < NUM_KEYS; i++) {
        db.set(`key${i}`, 'val' + i, () => {
          callbacksFired++;
          if (callbacksFired === NUM_KEYS) {
            setImmediate(() => {
              try {
                expect(drainFiredWithQueueItems).toBe(false);
                db.close();
                db.on('write_close', () => {
                  try { fs.unlinkSync(tmpFile); } catch (_) {}
                  done();
                });
              } catch (e) {
                try { fs.unlinkSync(tmpFile); } catch (_) {}
                done(e);
              }
            });
          }
        });
      }
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(tmpFile); } catch (_) {}
      done(err);
    });
  });
});