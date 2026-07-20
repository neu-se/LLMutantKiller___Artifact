import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise Library', () => {
  it('should only enable long stack support when Q_DEBUG is set and process is an object', () => {
    delete process.env.Q_DEBUG;
    Q.longStackSupport = false;
    process.env.Q_DEBUG = 'true';
    expect(Q.longStackSupport).toBe(false);
    delete process.env.Q_DEBUG;
    process.env.Q_DEBUG = 'true';
    Q.longStackSupport = false;
    process = { env: { Q_DEBUG: 'true' } };
    expect(Q.longStackSupport).toBe(true);
  });
});