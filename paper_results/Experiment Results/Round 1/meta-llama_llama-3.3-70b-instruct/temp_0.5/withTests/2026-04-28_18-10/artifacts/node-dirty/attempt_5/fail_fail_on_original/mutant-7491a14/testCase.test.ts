import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty db', function () {
  it('should throw an error when reading a file with invalid json', async function () {
    const filePath = path.join(__dirname, 'test.dirty');
    fs.writeFileSync(filePath, '{key: "key", val: "value"}\n', 'utf8');

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