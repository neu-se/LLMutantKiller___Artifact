import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit an error when loading a corrupted row', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty.on('error', (err) => {
        expect(err.message).toBe('Could not load corrupted row: {"key":"test","val":null}');
        rimraf.sync(dbPath);
        done();
      });

      fs.appendFileSync(dbPath, '{"key":"test","val":null}\n{"key":"test2","val":null');
    });

    dirty.on('error', (err) => {
      expect(err.message).toBe('Could not load corrupted row: {"key":"test","val":null}');
      rimraf.sync(dbPath);
      done();
    });
  });
});