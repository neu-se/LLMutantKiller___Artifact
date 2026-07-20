import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export', () => {
  it('should create Delta instance successfully', () => {
    // This test verifies the basic functionality which depends on proper module export
    // The mutation changes the module export condition, which should break this behavior
    const delta = new Delta();
    delta.insert('Hello');
    delta.insert(' World', { bold: true });
    delta.delete(1);

    expect(delta.ops.length).toBeGreaterThan(0);
    expect(delta.ops[0]).toEqual({ insert: 'Hello' });
    expect(delta.ops[1]).toEqual({ insert: ' World', attributes: { bold: true } });
    expect(delta.ops[2]).toEqual({ delete: 1 });
  });
});