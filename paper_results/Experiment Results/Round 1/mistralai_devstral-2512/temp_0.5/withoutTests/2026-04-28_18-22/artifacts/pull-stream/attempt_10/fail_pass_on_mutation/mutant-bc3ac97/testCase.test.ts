import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with 3 arguments', () => {
  it('should return the final read function when 3 sinks are provided', () => {
    const initialRead = () => 'start';
    const sink1 = (read) => () => read() + '->1';
    const sink2 = (read) => () => read() + '->2';
    const sink3 = (read) => () => read() + '->3';

    const result = pull(sink1, sink2, sink3)(initialRead)();
    expect(result).toBe('start->1->2->3');
  });
});