import * as fs from 'fs';
import * as path from 'path';
import { readFileSync } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('jsonfile', () => {
  it('should use fs when fs is available', () => {
    const file = 'test.json';
    const data = { test: 'data' };
    fs.writeFileSync(file, JSON.stringify(data));
    const jsonfile = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
    expect(jsonfile._fs).toBe(fs);
    fs.unlinkSync(file);
  });
});