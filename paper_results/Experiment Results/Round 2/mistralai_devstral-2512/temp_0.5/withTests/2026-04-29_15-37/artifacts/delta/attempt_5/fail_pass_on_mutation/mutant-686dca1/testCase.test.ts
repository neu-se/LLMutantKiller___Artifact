// testCase.test.ts

import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta module export', () => {
  it('should export Delta as default', () => {
    expect(Delta).toBeDefined();
    expect(typeof Delta).toBe('function');
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
  });
});