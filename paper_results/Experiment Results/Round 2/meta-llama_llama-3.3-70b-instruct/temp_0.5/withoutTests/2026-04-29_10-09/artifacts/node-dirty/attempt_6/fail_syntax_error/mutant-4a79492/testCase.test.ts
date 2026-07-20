import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit drain event when queue is empty', (done) => {
    const db = new Dirty('test.db');
    db.on('load', () => {
      db.set('test', 'value', () => {
        db.set('test2', 'value2', () => {
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
          db.set('test3', 'value3', () => {
            db.set('test4', 'value4', () => {
              db.set('test5', 'value5', () => {
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
                                                                  db.set('test31', 'value31', () => {
                                                                    db.set('test32', 'value32', () => {
                                                                      db.set('test33', 'value33', () => {
                                                                        db.set('test34', 'value34', () => {
                                                                          db.set('test35', 'value35', () => {
                                                                            db.set('test36', 'value36', () => {
                                                                              db.set('test37', 'value37', () => {
                                                                                db.set('test38', 'value38', () => {
                                                                                  db.set('test39', 'value39', () => {
                                                                                    db.set('test40', 'value40', () => {
                                                                                      db.set('test41', 'value41', () => {
                                                                                        db.set('test42', 'value42', () => {
                                                                                          db.set('test43', 'value43', () => {
                                                                                            db.set('test44', 'value44', () => {
                                                                                              db.set('test45', 'value45', () => {
                                                                                                db.set('test46', 'value46', () => {
                                                                                                  db.set('test47', 'value47', () => {
                                                                                                    db.set('test48', 'value48', () => {
                                                                                                      db.set('test49', 'value49', () => {
                                                                                                        db.set('test50', 'value50', () => {
                                                                                                          db.set('test51', 'value51', () => {
                                                                                                            db.set('test52', 'value52', () => {
                                                                                                              db.set('test53', 'value53', () => {
                                                                                                                db.set('test54', 'value54', () => {
                                                                                                                  db.set('test55', 'value55', () => {
                                                                                                                    db.set('test56', 'value56', () => {
                                                                                                                      db.set('test57', 'value57', () => {
                                                                                                                        db.set('test58', 'value58', () => {
                                                                                                                          db.set('test59', 'value59', () => {
                                                                                                                            db.set('test60', 'value60', () => {
                                                                                                                              db.set('test61', 'value61', () => {
                                                                                                                                db.set('test62', 'value62', () => {
                                                                                                                                  db.set('test63', 'value63', () => {
                                                                                                                                    db.set('test64', 'value64', () => {
                                                                                                                                      db.set('test65', 'value65', () => {
                                                                                                                                        db.set('test66', 'value66', () => {
                                                                                                                                          db.set('test67', 'value67', () => {
                                                                                                                                            db.set('test68', 'value68', () => {
                                                                                                                                              db.set('test69', 'value69', () => {
                                                                                                                                                db.set('test70', 'value70', () => {
                                                                                                                                                  db.set('test71', 'value71', () => {
                                                                                                                                                    db.set('test72', 'value72', () => {
                                                                                                                                                      db.set('test73', 'value73', () => {
                                                                                                                                                        db.set('test74', 'value74', () => {
                                                                                                                                                          db.set('test75', 'value75', () => {
                                                                                                                                                            db.set('test76', 'value76', () => {
                                                                                                                                                              db.set('test77', 'value77', () => {
                                                                                                                                                                db.set('test78', 'value78', () => {
                                                                                                                                                                  db.set('test79', 'value79', () => {
                                                                                                                                                                    db.set('test80', 'value80', () => {
                                                                                                                                                                      db.set('test81', 'value81', () => {
                                                                                                                                                                        db.set('test82', 'value82', () => {
                                                                                                                                                                          db.set('test83', 'value83', () => {
                                                                                                                                                                            db.set('test84', 'value84', () => {
                                                                                                                                                                              db.set('test85', 'value85', () => {
                                                                                                                                                                                db.set('test86', 'value86', () => {
                                                                                                                                                                                  db.set('test87', 'value87', () => {
                                                                                                                                                                                    db.set('test88', 'value88', () => {
                                                                                                                                                                                      db.set('test89', 'value89', () => {
                                                                                                                                                                                        db.set('test90', 'value90', () => {
                                                                                                                                                                                          db.set('test91', 'value91', () => {
                                                                                                                                                                                            db.set('test92', 'value92', () => {
                                                                                                                                                                                              db.set('test93', 'value93', () => {
                                                                                                                                                                                                db.set('test94', 'value94', () => {
                                                                                                                                                                                                  db.set('test95', 'value95', () => {
                                                                                                                                                                                                    db.set('test96', 'value96', () => {
                                                                                                                                                                                                      db.set('test97', 'value97', () => {
                                                                                                                                                                                                        db.set('test98', 'value98', () => {
                                                                                                                                                                                                          db.set('test99', 'value99', () => {
                                                                                                                                                                                                            db.set('test100', 'value100', () => {
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