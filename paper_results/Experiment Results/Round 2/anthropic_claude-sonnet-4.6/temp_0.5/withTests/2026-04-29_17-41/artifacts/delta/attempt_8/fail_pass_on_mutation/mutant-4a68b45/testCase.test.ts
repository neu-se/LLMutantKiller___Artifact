import { Op } from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Op', () => {
  it('length returns insert string length when retain is null', () => {
    const op = { insert: 'hello', retain: null } as unknown as Parameters<typeof Op.length>[0];
    expect(Op.length(op)).toEqual(5);
  });
});