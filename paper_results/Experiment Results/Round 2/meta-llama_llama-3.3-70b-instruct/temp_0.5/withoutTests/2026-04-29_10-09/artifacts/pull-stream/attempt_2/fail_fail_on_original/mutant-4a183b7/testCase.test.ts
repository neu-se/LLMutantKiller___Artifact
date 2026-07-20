import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should call the source function if it exists', () => {
    let sourceCalled = false;
    const read = {
      source: () => {
        sourceCalled = true;
        return 'source called';
      }
    };
    const result = pull(function() {}, read);
    expect(sourceCalled).toBe(true);
    expect(result).toBe('source called');
  });
});