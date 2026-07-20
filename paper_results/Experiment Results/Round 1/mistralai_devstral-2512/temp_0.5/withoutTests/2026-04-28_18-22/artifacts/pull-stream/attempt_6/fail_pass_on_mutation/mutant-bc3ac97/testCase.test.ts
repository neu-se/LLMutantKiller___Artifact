import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with 3 arguments', () => {
  it('should correctly process 3 sinks and return the final read function', () => {
    const initialRead = () => 'initial';
    const sink1 = (read) => () => read() + '->sink1';
    const sink2 = (read) => () => read() + '->sink2';
    const sink3 = (read) => () => read() + '->sink3';

    const result = pull(sink1, sink2, sink3)(initialRead);
    const output = result();

    expect(output).toBe('initial->sink1->sink2->sink3');
  });
});