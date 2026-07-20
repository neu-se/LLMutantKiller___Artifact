import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("dirty database file parsing with corrupted data", () => {
  const testFile = path.join(__dirname, "corrupted.dirty");
  const corruptedData = '{"key":"test","val":"data"}\ncorrupted_line\n{"key":"another","val":"entry"}\n';

  beforeAll(() => {
    fs.writeFileSync(testFile, corruptedData);
  });

  afterAll(() => {
    rimraf.sync(testFile);
  });

  it("should emit error when encountering corrupted data during load", (done) => {
    const db = new Dirty(testFile);
    db.on("error", (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain("Empty lines never appear in a healthy database");
      done();
    });
  });
});