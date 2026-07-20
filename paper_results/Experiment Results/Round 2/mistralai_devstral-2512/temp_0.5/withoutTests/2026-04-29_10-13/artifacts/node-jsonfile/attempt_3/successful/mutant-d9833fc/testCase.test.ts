import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { writeFileSync } from "fs";

describe('graceful-fs fallback behavior', () => {
  it('should use fs when graceful-fs throws during require', () => {
    // Force the module to reload to trigger the catch block
    jest.resetModules();

    // Mock graceful-fs to throw during require
    jest.mock('graceful-fs', () => {
      throw new Error('graceful-fs not available');
    }, { virtual: true });

    const { readFileSync } = require("../../../../../../../../../../../subject_repositories/node-jsonfile/index.js");

    const testFile = './test.json';
    const testData = { test: 'data' };

    // Write file using standard fs
    writeFileSync(testFile, JSON.stringify(testData));

    // Read file - should work because of fs fallback
    const result = readFileSync(testFile);
    expect(result).toEqual(testData);
  });
});