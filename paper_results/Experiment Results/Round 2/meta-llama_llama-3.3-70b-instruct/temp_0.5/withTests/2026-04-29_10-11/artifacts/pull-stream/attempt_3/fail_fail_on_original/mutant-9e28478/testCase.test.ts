import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should handle case 2 correctly', () => {
    const read = pull(
      pull.values([1, 2, 3]),
      pull.map((x) => x),
      pull.map((x) => x)
    );

    let ended = false;
    let data: any[] = [];

    read(null, function (end, d) {
      if (end) ended = true;
      else data.push(d);
    });

    read(null, function (end, d) {
      if (end) ended = true;
      else data.push(d);
    });

    read(null, function (end, d) {
      if (end) ended = true;
      else data.push(d);
    });

    expect(ended).toBe(true);
    expect(data).toEqual([1, 2]);
  });
});