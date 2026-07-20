import * as fs from "fs";
import { Readable } from "stream";
import * as path from "path";
import * as os from "os";

const Dirty = require("../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js");

describe("Dirty database", () => {
  it("should handle chunks without newlines correctly", (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${process.pid}.db`);
    
    // Create the file first (needed for write stream)
    fs.writeFileSync(dbPath, "", "utf-8");
    
    // Mock createReadStream to deliver specific chunks
    const mockReadStream = new Readable({ read() {} });
    jest.spyOn(fs, 'createReadStream').mockReturnValueOnce(mockReadStream as any);
    
    const db = new Dirty(dbPath);
    
    // Deliver chunks: first without newline, then with newline
    process.nextTick(() => {
      mockReadStream.emit('data', '{"key":"a","val":1}');  // no newline
      mockReadStream.emit('data', '\n{"key":"b","val":2}\n');
      mockReadStream.emit('end');
      mockReadStream.emit('close');
    });
    
    const errors: Error[] = [];
    db.on("error", (err: Error) => errors.push(err));
    db.on("load", (count: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(2);
        expect(db.get("a")).toBe(1);
        expect(db.get("b")).toBe(2);
        done();
      } catch (e) {
        done(e);
      } finally {
        jest.restoreAllMocks();
        try { fs.unlinkSync(dbPath); } catch {}
      }
    });
  });
});