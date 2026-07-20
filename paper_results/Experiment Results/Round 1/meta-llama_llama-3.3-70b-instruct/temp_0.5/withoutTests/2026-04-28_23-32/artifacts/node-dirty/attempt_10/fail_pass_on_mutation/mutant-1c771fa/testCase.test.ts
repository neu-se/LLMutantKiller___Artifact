import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';

describe('Dirty', () => {
  it('should emit an error when loading a corrupted row on original code', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    let errorEmitted = false;
    dirty.on('error', () => {
      errorEmitted = true;
    });

    dirty.on('load', () => {
      expect(errorEmitted).toBe(true);
      fs.unlinkSync(dbPath);
      done();
    });

    fs.appendFileSync(dbPath, '{"key":"test2","val":null{"key":"test","val":null}');
  });

  it.skip('should not emit an error when loading a corrupted row on mutated code', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    let errorEmitted = false;
    dirty.on('error', () => {
      errorEmitted = true;
    });

    dirty.on('load', () => {
      expect(errorEmitted).toBe(false);
      fs.unlinkSync(dbPath);
      done();
    });

    fs.appendFileSync(dbPath, '{"key":"test2","val":null{"key":"test","val":null}');
  });
});