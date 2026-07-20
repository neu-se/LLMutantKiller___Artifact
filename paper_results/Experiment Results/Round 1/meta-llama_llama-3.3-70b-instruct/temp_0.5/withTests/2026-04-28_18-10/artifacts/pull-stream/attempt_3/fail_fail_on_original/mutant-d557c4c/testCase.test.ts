import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull.js', () => {
  it('should pass when s is an object with a function sink and source', () => {
    const s = {
      sink: () => {},
      source: () => {}
    };
    expect(() => {
      pull(
        () => {},
        s
      );
    }).not.toThrowError();
  });
});