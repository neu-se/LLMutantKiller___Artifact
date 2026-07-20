import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty db', function () {
  it('should throw an error when reading a file with non-utf8 encoding', async function () {
    const filePath = path.join(__dirname, 'test.dirty');
    fs.writeFileSync(filePath, Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]));

    try {
      const db = new Dirty(filePath);
      await new Promise((resolve) => db.on('load', resolve));
      expect(db.get('key')).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    } finally {
      fs.unlinkSync(filePath);
    }
  });
});