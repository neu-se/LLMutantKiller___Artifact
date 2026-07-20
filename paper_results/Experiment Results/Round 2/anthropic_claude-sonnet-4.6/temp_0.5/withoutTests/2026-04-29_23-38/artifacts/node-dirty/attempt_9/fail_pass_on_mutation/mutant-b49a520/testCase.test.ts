import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { Readable } from "stream";

jest.mock('fs', () => {
  const actual = jest.requireActual('fs');
  return { ...actual, createReadStream: jest.fn((...args: any[]) => actual.createReadStream(...args)) };
});

describe("Dirty database", () => {
  it("should not emit errors when loading valid data with chunks lacking newlines", (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `test-${process.pid}.db`);
    const actualFs = jest.requireActual('fs') as typeof fs;
    actualFs.writeFileSync(dbPath, "", "utf-8");
    
    const mockStream = new Readable({ read() {} });
    (fs.createReadStream as jest.Mock).mockImplementationOnce(() => mockStream);
    
    const Dirty = require("../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js");
    const db = new Dirty(dbPath);
    const errors: Error[] = [];
    db.on("error", (e: Error) => errors.push(e));
    db.on("load", (count: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(1);
        done();
      } catch(e) { done(e); }
      finally { try { actualFs.unlinkSync(dbPath); } catch {} }
    });
    
    process.nextTick(() => {
      mockStream.push('{"key":"a","val":1}\n');
      mockStream.push(null);
      mockStream.emit('close');
    });
  });
});