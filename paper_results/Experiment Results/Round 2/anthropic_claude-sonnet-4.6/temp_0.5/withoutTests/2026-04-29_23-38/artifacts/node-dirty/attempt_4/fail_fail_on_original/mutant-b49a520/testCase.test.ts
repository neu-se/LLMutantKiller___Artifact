import * as fs from "fs";
import { Readable, Writable } from "stream";
import * as path from "path";
import * as os from "os";

describe("Dirty database", () => {
  it("should not emit error for valid data delivered in chunks without newlines", (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-mock-test-${process.pid}.db`);
    
    // Create a mock read stream that delivers chunks without newlines first
    const mockReadStream = new Readable({ read() {} });
    const mockWriteStream = new Writable({ write(chunk, enc, cb) { cb(); } });
    mockWriteStream.on = mockWriteStream.on.bind(mockWriteStream);
    (mockWriteStream as any).cork = () => {};
    (mockWriteStream as any).uncork = () => {};
    (mockWriteStream as any).end = (cb?: () => void) => { if (cb) cb(); };
    (mockWriteStream as any).destroy = () => {};
    
    const originalCreateReadStream = fs.createReadStream;
    const originalCreateWriteStream = fs.createWriteStream;
    
    Object.defineProperty(fs, 'createReadStream', {
      value: (p: any, opts: any) => mockReadStream,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(fs, 'createWriteStream', {
      value: (p: any, opts: any) => mockWriteStream,
      writable: true,
      configurable: true,
    });
    
    const Dirty = require("../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js");
    const db = new Dirty(dbPath);
    
    const errors: Error[] = [];
    db.on("error", (err: Error) => errors.push(err));
    db.on("load", (count: number) => {
      Object.defineProperty(fs, 'createReadStream', { value: originalCreateReadStream, writable: true, configurable: true });
      Object.defineProperty(fs, 'createWriteStream', { value: originalCreateWriteStream, writable: true, configurable: true });
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(2);
        done();
      } catch (e) {
        done(e);
      } finally {
        try { fs.unlinkSync(dbPath); } catch {}
      }
    });
    
    process.nextTick(() => {
      mockReadStream.push('{"key":"a","val":1}');
      mockReadStream.push('\n{"key":"b","val":2}\n');
      mockReadStream.push(null);
      mockReadStream.emit('close');
    });
  });
});