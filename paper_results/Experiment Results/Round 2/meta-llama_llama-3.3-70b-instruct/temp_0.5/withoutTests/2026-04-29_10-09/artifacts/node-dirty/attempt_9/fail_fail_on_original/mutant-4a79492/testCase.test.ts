import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit drain event when queue is empty', (done) => {
    const db = new Dirty('test.db');
    db.on('load', () => {
      db.set('test', 'value', () => {
        db.set('test2', 'value2', () => {
          db.set('test3', 'value3', () => {
            db.set('test4', 'value4', () => {
              db.set('test5', 'value5', () => {
                db.set('test6', 'value6', () => {
                  db.set('test7', 'value7', () => {
                    db.set('test8', 'value8', () => {
                      db.set('test9', 'value9', () => {
                        db.set('test10', 'value10', () => {
                          db.on('drain', () => {
                            expect(db._queue.size).toBe(0);
                            db.close();
                            fs.unlink('test.db', (err) => {
                              if (err) {
                                throw err;
                              }
                              done();
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});