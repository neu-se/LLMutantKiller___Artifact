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
  it("should handle empty string chunks correctly", (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${process.pid}.db`);
    const actualFs = jest.requireActual('fs') as typeof fs;
    actualFs.writeFileSync(dbPath, "", "utf-8");
    
    const mockReadStream = new Readable({ read() {} });
    (fs.createReadStream as jest.Mock).mockImplementationOnce(() => mockReadStream);
    
    const Dirty = require("../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js");
    const db = new Dirty(dbPath);
    
    const errors: Error[] = [];
    db.on("error", (err: Error) => errors.push(err));
    db.on("load", (count: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(1);
        expect(db.get("key")).toBe("value");
        done();
      } catch (e) { done(e); }
      finally { try { actualFs.unlinkSync(dbPath); } catch {} }
    });
    
    process.nextTick(() => {
      mockReadStream.push('{"key":"key","val":"value"}\n');
      mockReadStream.push(null);
      mockReadStream.emit('close');
    });
  });
});