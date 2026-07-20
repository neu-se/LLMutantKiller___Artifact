import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should not throw an error when parsing a row', (done) => {
    const db = new Dirty();
    const filePath = 'test.dirty';
    fs.writeFileSync(filePath, '{"key":"test","val":"value"}\n');
    const db2 = new Dirty(filePath);
    db2.on('load', () => {
      expect(() => db2.get('test')).not.toThrow();
      fs.unlinkSync(filePath);
      done();
    });
    db2.on('error', (err) => {
      expect(err).toBeUndefined();
      fs.unlinkSync(filePath);
      done();
    });
  });
});