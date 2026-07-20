import * as fs from "fs";
import * as path from "path";
import * as os from "os";

const Dirty = require("../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js");

describe("Dirty database", () => {
  it("should load data correctly from a file where lines span read chunk boundaries", (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-boundary-test-${process.pid}.db`);
    
    // Create a file where lines span the 64KB chunk boundary
    // Default highWaterMark for fs.createReadStream is 65536 bytes
    const CHUNK_SIZE = 65536;
    
    // Make a value long enough that the first line spans the chunk boundary
    // JSON overhead: {"key":"k1","val":"..."}\n
    const prefix = '{"key":"k1","val":"';
    const suffix = '"}\n';
    const valueLen = CHUNK_SIZE - prefix.length - suffix.length + 10; // crosses boundary
    const longValue = "a".repeat(valueLen);
    
    const line1 = JSON.stringify({ key: "k1", val: longValue });
    const line2 = JSON.stringify({ key: "k2", val: "short" });
    const content = line1 + "\n" + line2 + "\n";
    
    fs.writeFileSync(dbPath, content, "utf-8");
    
    const errors: Error[] = [];
    const db = new Dirty(dbPath);
    
    db.on("error", (err: Error) => errors.push(err));
    db.on("load", (count: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(2);
        expect(db.get("k1")).toBe(longValue);
        expect(db.get("k2")).toBe("short");
        done();
      } catch (e) {
        done(e);
      } finally {
        try { fs.unlinkSync(dbPath); } catch {}
      }
    });
  });
});