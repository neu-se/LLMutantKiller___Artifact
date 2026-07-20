import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise Library', () => {
  it('should create a Q object', () => {
    expect(Q).toBeDefined();
    expect(typeof Q).toBe('function');
  });
});