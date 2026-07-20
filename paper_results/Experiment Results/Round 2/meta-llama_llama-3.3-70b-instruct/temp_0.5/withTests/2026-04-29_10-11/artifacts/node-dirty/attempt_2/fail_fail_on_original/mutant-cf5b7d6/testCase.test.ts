import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should parse row correctly', (done) => {
    const db = new Dirty();
    const filePath = 'test.dirty';
    fs.writeFileSync(filePath, '{"key":"test","val":"value"}\n');
    const db2 = new Dirty(filePath);
    db2.on('load', () => {
      expect(db2.get('test')).toBe('value');
      fs.unlinkSync(filePath);
      done();
    });
  });
});