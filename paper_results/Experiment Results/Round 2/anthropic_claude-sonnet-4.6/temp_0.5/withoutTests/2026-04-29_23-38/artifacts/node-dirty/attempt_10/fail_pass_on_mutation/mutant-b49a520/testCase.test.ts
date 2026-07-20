jest.mock('fs', () => {
  const actual = jest.requireActual('fs');
  return {
    ...actual,
    createReadStream: jest.fn((...args: any[]) => actual.createReadStream(...args)),
  };
});

import * as fs from "fs";
import { Readable } from "stream";
import * as path from "path";
import * as os from "os";

describe("Dirty database", () => {
  it("should correctly handle chunks without newlines", (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${process.pid}.db`);
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
        expect(count).toBe(2);
        expect(db.get("a")).toBe(1);
        expect(db.get("b")).toBe(2);
        done();
      } catch(e) { done(e); }
      finally { try { actualFs.unlinkSync(dbPath); } catch {} }
    });
    
    process.nextTick(() => {
      // First chunk without newline - triggers early return in original
      mockStream.push('{"key":"a","val":1}');
      // Second chunk with newline
      mockStream.push('\n{"key":"b","val":2}\n');
      mockStream.push(null);
      mockStream.emit('close');
    });
  });
});