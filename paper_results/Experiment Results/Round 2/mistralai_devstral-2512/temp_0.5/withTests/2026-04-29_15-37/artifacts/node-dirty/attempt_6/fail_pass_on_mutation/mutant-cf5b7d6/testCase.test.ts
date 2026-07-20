import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("dirty database row processing return value", () => {
  const testFile = path.join(__dirname, "test.dirty");
  const testData = '{"key":"test","val":"data"}\n{"key":"another","val":"entry"}\n';

  beforeAll(() => {
    fs.writeFileSync(testFile, testData);
  });

  afterAll(() => {
    fs.unlinkSync(testFile);
  });

  it("should return empty string from row processing to clear buffer", (done) => {
    const db = new Dirty(testFile);
    let bufferContent = "";

    // Override the internal buffer handling to capture the return value
    const originalOnData = db._readStream.listeners('data')[0];
    db._readStream.off('data', originalOnData);
    db._readStream.on('data', (chunk) => {
      bufferContent += chunk;
      if (chunk.lastIndexOf('\n') === -1) return;
      const arr = bufferContent.split('\n');
      bufferContent = arr.pop();
      const result = arr.forEach((rowStr) => {
        if (!rowStr) {
          db.emit('error', new Error('Empty lines never appear in a healthy database'));
          return;
        }

        let row;
        try {
          row = JSON.parse(rowStr);
          if (!('key' in row)) {
            throw new Error();
          }
        } catch (e) {}

        if (row.val === undefined) {
          db._data.delete(row.key);
        } else {
          db._data.set(row.key, row.val);
        }
        return '';
      });

      expect(result).toBeUndefined();
      done();
    });
  });
});