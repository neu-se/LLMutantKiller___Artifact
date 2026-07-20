import fs from 'fs';
import path from 'path';
import { readFileSync } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('jsonfile', () => {
  it('should use fs when graceful-fs fails to load', () => {
    jest.mock('graceful-fs', () => {
      throw new Error();
    });
    try {
      const tempFile = 'temp.json';
      fs.writeFileSync(tempFile, '{}');
      const result = readFileSync(tempFile);
      expect(result).toEqual({});
      fs.unlinkSync(tempFile);
    } catch (e) {
      throw e;
    } finally {
      jest.unmock('graceful-fs');
    }
    // Additional check to ensure fs was used
    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
  });
});