import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should handle case 2 correctly', () => {
    const values = [1, 2, 3];
    const read = pull(
      pull.values(values),
      pull.map((x: number) => x),
      pull.map((x: number) => x)
    );

    let ended = false;
    let data: number[] = [];

    read(null, (end: any, d: number) => {
      if (end) ended = true;
      else data.push(d);
    });

    read(null, (end: any, d: number) => {
      if (end) ended = true;
      else data.push(d);
    });

    read(null, (end: any, d: number) => {
      if (end) ended = true;
      else data.push(d);
    });

    expect(ended).toBe(true);
    expect(data).toEqual([1, 2]);
  });
});