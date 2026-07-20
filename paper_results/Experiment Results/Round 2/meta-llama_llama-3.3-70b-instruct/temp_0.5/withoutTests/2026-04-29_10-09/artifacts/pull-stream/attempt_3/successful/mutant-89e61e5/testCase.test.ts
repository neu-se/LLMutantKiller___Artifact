import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when partial sink is called twice', () => {
    const read = () => {};
    const sink = pull(function (read: any) {
      return read;
    });
    sink(read);
    expect(() => sink(read)).toThrowError('partial sink should only be called once!');
  });
});