import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty db', function () {
  it('should throw an error when file is not utf8 encoded', async function () {
    const filePath = path.join(__dirname, 'test.dirty');
    fs.writeFileSync(filePath, Buffer.from([0xff, 0xfe, 0xfd]));

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