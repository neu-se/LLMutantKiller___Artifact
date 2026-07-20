// <Jest test file containing exactly one test case>
import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("Dirty database loading", () => {
  it("should correctly load data from a file with multiple rows", (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${Date.now()}.db`);
    
    // Write a database file with multiple rows
    const rows = [
      JSON.stringify({ key: "foo", val: "bar" }),
      JSON.stringify({ key: "baz", val: 42 }),
      JSON.stringify({ key: "qux", val: { nested: true } }),
    ].join("\n") + "\n";
    
    fs.writeFileSync(dbPath, rows, "utf-8");
    
    const db = new Dirty(dbPath);
    db.on("load", (count: number) => {
      try {
        expect(count).toBe(3);
        expect(db.get("foo")).toBe("bar");
        expect(db.get("baz")).toBe(42);
        expect(db.get("qux")).toEqual({ nested: true });
        done();
      } catch (e) {
        done(e);
      } finally {
        try { fs.unlinkSync(dbPath); } catch {}
      }
    });
    db.on("error", (err: Error) => {
      done(err);
      try { fs.unlinkSync(dbPath); } catch {}
    });
  });
});