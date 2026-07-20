import { readFile } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("readFile with string encoding option", () => {
  it("should correctly parse JSON when encoding is passed as a string", async () => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), "jsonfile-test-"));
    const testFile = path.join(testDir, "test.json");
    const testData = { hello: "world" };

    try {
      fs.writeFileSync(testFile, JSON.stringify(testData), "utf8");

      const result = await readFile(testFile, "utf8");

      expect(result).toEqual(testData);
    } finally {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });
});