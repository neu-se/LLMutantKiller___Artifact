import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it.skip('should pass when called with a callback', () => {
    expect(() => find(null, () => {})).not.toThrow();
  });

  it('should fail when called without a callback', () => {
    expect(() => find(null)).toThrow();
  });
});