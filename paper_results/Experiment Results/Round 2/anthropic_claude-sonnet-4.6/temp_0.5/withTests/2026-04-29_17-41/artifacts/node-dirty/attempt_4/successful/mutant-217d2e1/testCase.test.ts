import fs from 'fs';
import path from 'path';

describe('dirty return value from corrupted row handler', () => {
  it('should return empty string from corrupted row forEach callback', (done) => {
    const returnValues: any[] = [];
    const originalForEach = Array.prototype.forEach;
    
    // Temporarily capture forEach return values from callbacks
    (Array.prototype as any).forEach = function(callback: Function, thisArg?: any) {
      return originalForEach.call(this, function(...args: any[]) {
        const result = callback.apply(thisArg, args);
        returnValues.push(result);
        return result;
      });
    };
    
    const file = path.join(__dirname, 'test-return-val.dirty');
    fs.writeFileSync(file, 'BAD_ROW\n');
    
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);
    
    db.on('error', () => {});
    db.on('load', () => {
      Array.prototype.forEach = originalForEach;
      if (fs.existsSync(file)) fs.unlinkSync(file);
      
      // The corrupted row callback should return '' not "Stryker was here!"
      expect(returnValues).toContain('');
      expect(returnValues).not.toContain('Stryker was here!');
      done();
    });
  });
});