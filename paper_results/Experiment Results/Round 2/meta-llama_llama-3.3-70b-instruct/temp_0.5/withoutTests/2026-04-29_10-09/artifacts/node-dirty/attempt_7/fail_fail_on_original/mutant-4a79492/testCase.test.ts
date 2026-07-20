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
                db.set('test6', 'value6', () => {
                  db.set('test7', 'value7', () => {
                    db.set('test8', 'value8', () => {
                      db.set('test9', 'value9', () => {
                        db.set('test10', 'value10', () => {
                          db.set('test11', 'value11', () => {
                            db.set('test12', 'value12', () => {
                              db.set('test13', 'value13', () => {
                                db.set('test14', 'value14', () => {
                                  db.set('test15', 'value15', () => {
                                    db.set('test16', 'value16', () => {
                                      db.set('test17', 'value17', () => {
                                        db.set('test18', 'value18', () => {
                                          db.set('test19', 'value19', () => {
                                            db.set('test20', 'value20', () => {
                                              db.set('test21', 'value21', () => {
                                                db.set('test22', 'value22', () => {
                                                  db.set('test23', 'value23', () => {
                                                    db.set('test24', 'value24', () => {
                                                      db.set('test25', 'value25', () => {
                                                        db.set('test26', 'value26', () => {
                                                          db.set('test27', 'value27', () => {
                                                            db.set('test28', 'value28', () => {
                                                              db.set('test29', 'value29', () => {
                                                                db.set('test30', 'value30', () => {
                                                                  expect(db._queue.size).toBe(30);
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
    });
  });
});