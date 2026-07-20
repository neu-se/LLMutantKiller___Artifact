import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should parse row correctly', (done) => {
    const filePath = 'test.dirty';
    fs.writeFileSync(filePath, '{"key":"test","val":"value"}\n');
    const db = new Dirty(filePath);
    db.on('load', () => {
      expect(db.get('test')).toBe('value');
      db.close();
      fs.unlinkSync(filePath);
      done();
    });
    db.on('error', (err) => {
      expect(err).toBeUndefined();
      db.close();
      fs.unlinkSync(filePath);
      done();
    });
  });
});