import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with 3 arguments', () => {
  it('should execute the case 3 branch and return the expected result', () => {
    const read = () => 'original';
    const sink1 = (read) => () => read() + '-sink1';
    const sink2 = (read) => () => read() + '-sink2';
    const sink3 = (read) => () => read() + '-sink3';

    const result = pull(sink1, sink2, sink3)(read)();
    expect(result).toBe('original-sink1-sink2-sink3');
  });
});