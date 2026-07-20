import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('error message contains "with" not empty string when this delta is non-document', () => {
    const a = new Delta().retain(1);
    const b = new Delta().insert('Test');
    let caughtMessage = '';
    try {
      a.diff(b);
    } catch (e) {
      caughtMessage = (e as Error).message;
    }
    expect(caughtMessage).toMatch(/^diff\(\) called with non-document$/);
  });
});