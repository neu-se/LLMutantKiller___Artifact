import { Dirty } from '../../../../../../../lib/dirty/dirty.js';
import * as fs from 'fs';

describe('Dirty', () => {
  it('should parse row correctly', (done) => {
    const db = new Dirty('test.dirty');
    fs.writeFileSync('test.dirty', '{"key":"test","val":"value"}\n');
    db.on('load', () => {
      expect(db.get('test')).toBe('value');
      db.close();
      fs.unlinkSync('test.dirty');
      done();
    });
    db.on('error', (err: any) => {
      expect(err).toBeUndefined();
      db.close();
      fs.unlinkSync('test.dirty');
      done();
    });
  });
});