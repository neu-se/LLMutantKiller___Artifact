import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should handle read object with source function', () => {
    const read = {
      source: () => {}
    };
    const result = pull.default(read);
    expect(typeof result).toBe('function');
  });
});