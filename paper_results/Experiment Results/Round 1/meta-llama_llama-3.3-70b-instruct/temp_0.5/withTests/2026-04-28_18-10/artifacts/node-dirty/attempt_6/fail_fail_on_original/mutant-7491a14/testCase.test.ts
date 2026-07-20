import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty db', function () {
  it('should throw an error when encoding is not specified for read stream and file contains non-utf8 characters', async function () {
    const filePath = path.join(__dirname, 'test.dirty');
    fs.writeFileSync(filePath, Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'utf8');

    try {
      const db = new Dirty(filePath);
      await new Promise((resolve) => db.on('load', resolve));
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    } finally {
      fs.unlinkSync(filePath);
    }
  });
});