import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { Readable } from "stream";

jest.mock('fs', () => {
  const actual = jest.requireActual('fs');
  return { ...actual, createReadStream: jest.fn((...args: any[]) => actual.createReadStream(...args)) };
});

const Dirty = require("../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js");

describe("Dirty database", () => {
  it("should handle chunks without newlines correctly", (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${process.pid}.db`);
    
    fs.writeFileSync(dbPath, "", "utf-8");
    
    const mockReadStream = new Readable({ read() {} });
    (fs.createReadStream as jest.Mock).mockImplementationOnce((p: any, opts: any) => {
      if (opts && opts.flags === 'r') return mockReadStream;
      return jest.requireActual('fs').createReadStream(p, opts);
    });
    
    const db = new Dirty(dbPath);
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
        try { fs.unlinkSync(dbPath); } catch {}
      }
    });
    
    process.nextTick(() => {
      mockReadStream.push('{"key":"a","val":1}');
      mockReadStream.push('\n{"key":"b","val":2}\n');
      mockReadStream.push(null);
    });
  });
});