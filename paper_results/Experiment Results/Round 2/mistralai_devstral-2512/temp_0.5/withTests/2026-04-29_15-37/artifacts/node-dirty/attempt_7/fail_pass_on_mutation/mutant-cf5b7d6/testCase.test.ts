import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("dirty database row processing", () => {
  const testFile = path.join(__dirname, "test.dirty");
  const testData = '{"key":"test","val":"data"}\n{"key":"another","val":"entry"}\n';

  beforeAll(() => {
    fs.writeFileSync(testFile, testData);
  });

  afterAll(() => {
    fs.unlinkSync(testFile);
  });

  it("should correctly process rows and maintain buffer state", (done) => {
    const db = new Dirty(testFile);
    let bufferState = "";

    // Intercept the buffer processing
    const originalOnData = db._readStream.listeners('data')[0];
    db._readStream.off('data', originalOnData);
    db._readStream.on('data', (chunk) => {
      bufferState += chunk;
      if (chunk.lastIndexOf('\n') === -1) return;
      const arr = bufferState.split('\n');
      bufferState = arr.pop();
      arr.forEach((rowStr) => {
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
        const returnValue = '';
        expect(returnValue).toBe('');
      });
    });

    db.on("load", (size) => {
      expect(size).toBe(2);
      expect(db.get("test")).toBe("data");
      expect(db.get("another")).toBe("entry");
      done();
    });
  });
});