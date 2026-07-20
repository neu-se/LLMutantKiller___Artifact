import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('mutant detection test', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');
  const testData = '{"key":"test","val":"data"}\n{"key":"another","val":"value"}\n';

  beforeAll(() => {
    fs.writeFileSync(testFile, testData);
  });

  afterAll(() => {
    rimraf.sync(testFile);
  });

  it('should correctly load and validate rows with key property', (done) => {
    const db = new Dirty(testFile);
    db.on('load', (size) => {
      expect(size).toBe(2);
      expect(db.get('test')).toBe('data');
      expect(db.get('another')).toBe('value');
      done();
    });
  });
});