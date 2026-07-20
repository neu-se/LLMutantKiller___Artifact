import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise Library', () => {
  it('should not enable long stack support by default', () => {
    process.env.Q_DEBUG = 'true';
    const q = Q;
    expect(q.longStackSupport).toBe(false);
  });
});