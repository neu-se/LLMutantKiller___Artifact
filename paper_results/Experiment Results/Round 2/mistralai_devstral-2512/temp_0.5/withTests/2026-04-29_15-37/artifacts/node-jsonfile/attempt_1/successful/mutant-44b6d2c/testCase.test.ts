// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/node-jsonfile/attempt_1/pending_category/mutant-44b6d2c/testCase.test.ts

import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should only remove BOM at the start of content", () => {
    const contentWithBomInMiddle = "start\uFEFFmiddle\uFEFFend";
    const result = stripBom(contentWithBomInMiddle);
    expect(result).toBe("start\uFEFFmiddle\uFEFFend");
  });
});