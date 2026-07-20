import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

jest.mock('fs', () => {
  const actual = jest.requireActual('fs');
  return {
    ...actual,
    createWriteStream: jest.fn((...args: any[]) => actual.createWriteStream(...args)),
  };
});

import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty write stream options', () => {
  it('should create write stream with utf-8 encoding', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-enc-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
    
    const db = new Dirty(file);
    
    db.on('error', done);
    db.on('load', () => {
      const mockFn = (fs.createWriteStream as jest.Mock);
      const calls = mockFn.mock.calls;
      const writeStreamCall = calls.find((call: any[]) => call[0] === file);
      expect(writeStreamCall).toBeDefined();
      expect(writeStreamCall[1].encoding).toBe('utf-8');
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done();
    });
  });
});