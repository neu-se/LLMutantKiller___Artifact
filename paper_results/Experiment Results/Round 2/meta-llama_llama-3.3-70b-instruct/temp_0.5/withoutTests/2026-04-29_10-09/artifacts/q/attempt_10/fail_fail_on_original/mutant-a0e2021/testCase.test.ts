import { Q } from '../q';

describe('Q Promise Library', () => {
  it('should set longStackSupport to true when Q_DEBUG is set and process is an object', () => {
    delete process.env.Q_DEBUG;
    Q.longStackSupport = false;
    process.env.Q_DEBUG = 'true';
    expect(Q.longStackSupport).toBe(true);
  });
});