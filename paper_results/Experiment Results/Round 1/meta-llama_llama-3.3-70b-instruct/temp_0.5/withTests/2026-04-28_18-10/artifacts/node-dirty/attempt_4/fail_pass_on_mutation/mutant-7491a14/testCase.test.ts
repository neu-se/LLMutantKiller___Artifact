import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty db', function () {
  it('should read file correctly when encoding is specified for read stream', async function () {
    const filePath = path.join(__dirname, 'test.dirty');
    fs.writeFileSync(filePath, `${JSON.stringify({key: 'key', val: 'value'})}\n`, 'utf8');

    try {
      const db = new Dirty(filePath);
      await new Promise((resolve) => db.on('load', resolve));
      expect(db.get('key')).toBe('value');
    } finally {
      fs.unlinkSync(filePath);
    }
  });
});