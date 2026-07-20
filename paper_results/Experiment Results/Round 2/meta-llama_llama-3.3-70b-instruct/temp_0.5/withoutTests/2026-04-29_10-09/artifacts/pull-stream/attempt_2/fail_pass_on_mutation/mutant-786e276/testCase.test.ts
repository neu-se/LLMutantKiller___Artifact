import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should handle read object with source function', () => {
    const read = {
      source: () => {}
    };
    expect(() => pull.default(read)).not.toThrow();
  });
});