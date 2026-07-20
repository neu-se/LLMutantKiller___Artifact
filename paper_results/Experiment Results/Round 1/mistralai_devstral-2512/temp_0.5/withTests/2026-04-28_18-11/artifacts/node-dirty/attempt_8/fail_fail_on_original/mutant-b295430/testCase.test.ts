const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const Dirty = require('../../../../../../../lib/dirty/dirty.js');

describe('read_close event emission', () => {
  const testFile = path.join(__dirname, 'test_read_close.dirty');
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit read_close event with correct event name', (done) => {
    db = new Dirty(testFile);
    let loadFired = false;
    let readCloseFired = false;

    db.on('load', () => {
      loadFired = true;
      db.close();
    });

    db.on('read_close', () => {
      readCloseFired = true;
    });

    setTimeout(() => {
      if (loadFired && readCloseFired) {
        done();
      } else {
        done(new Error('read_close event not emitted with correct name'));
      }
    }, 1000);
  });
});