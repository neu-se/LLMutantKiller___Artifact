import { readFile } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import fs from "fs";
import path from "path";
import os from "os";

describe("readFile with encoding option", () => {
  it("should correctly handle encoding when passed as string", async () => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), "jsonfile-test-"));
    const testFile = path.join(testDir, "test.json");
    const testData = { hello: "world" };

    fs.writeFileSync(testFile, JSON.stringify(testData));

    try {
      const result = await readFile(testFile, "utf8");
      expect(result).toEqual(testData);
    } finally {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });
});