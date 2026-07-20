import * as fs from "fs";
import * as path from "path";
import * as os from "os";

const Dirty = require("../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js");

describe("Dirty database", () => {
  it("should correctly load data from a file that requires multiple read chunks", (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-chunk-boundary-test-${process.pid}.db`);
    
    // Create a file large enough to span multiple read chunks (default is 64KB)
    // This ensures the stream emits chunks that may not align with newlines
    const rows: string[] = [];
    const targetSize = 128 * 1024; // 128KB to ensure multiple chunks
    let currentSize = 0;
    let i = 0;
    
    while (currentSize < targetSize) {
      const row = JSON.stringify({ key: `key${i}`, val: `${"v".repeat(50)}${i}` });
      rows.push(row);
      currentSize += row.length + 1; // +1 for newline
      i++;
    }
    
    const totalRows = rows.length;
    const content = rows.join("\n") + "\n";
    fs.writeFileSync(dbPath, content, "utf-8");
    
    const errors: Error[] = [];
    const db = new Dirty(dbPath);
    
    db.on("error", (err: Error) => errors.push(err));
    db.on("load", (count: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(totalRows);
        // Verify a few specific entries
        expect(db.get("key0")).toBe(`${"v".repeat(50)}0`);
        expect(db.get(`key${totalRows - 1}`)).toBe(`${"v".repeat(50)}${totalRows - 1}`);
        done();
      } catch (e) {
        done(e);
      } finally {
        try { fs.unlinkSync(dbPath); } catch {}
      }
    });
  });
});