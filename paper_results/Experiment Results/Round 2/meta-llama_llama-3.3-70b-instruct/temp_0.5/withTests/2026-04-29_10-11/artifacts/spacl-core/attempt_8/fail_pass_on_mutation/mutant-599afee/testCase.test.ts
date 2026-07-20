import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('Rule', () => {
  it('should match context-dependent paths correctly', () => {
    const rule = Rule.for('/:foo');
    const ctx = { foo: 'bar' };
    const match = '/bar'.match(rule.regex);
    if (match !== null) {
      const prop = ctx[rule.regex.props[0]];
      if (prop !== undefined && match[1] === prop) {
        expect(rule.matches('/bar', ctx)).toBe(true);
      } else {
        expect(rule.matches('/bar', ctx)).toBe(false);
      }
    } else {
      expect(rule.matches('/bar', ctx)).toBe(false);
    }
    const ctx2 = { foo: 'bar' };
    expect(rule.matches('/bar', ctx2)).toBe(true);
    const ctx3 = { foo: 'qux' };
    expect(rule.matches('/bar', ctx3)).toBe(false);
    const rule2 = Rule.for('/:foo');
    const ctx4 = { foo: 'bar' };
    expect(rule2.matches('/bar', ctx4)).toBe(true);
    const rule3 = Rule.for('/:foo');
    const ctx5 = { foo: 'qux' };
    expect(rule3.matches('/bar', ctx5)).toBe(false);
    const rule4 = Rule.for('/:foo');
    const ctx6 = { foo: 'bar' };
    expect(rule4.matches('/bar', ctx6)).toBe(true);
    const rule5 = Rule.for('/:foo');
    const ctx7 = { foo: 'qux' };
    expect(rule5.matches('/bar', ctx7)).toBe(false);
    const rule6 = Rule.for('/:foo');
    const ctx8 = { foo: 'bar' };
    expect(rule6.matches('/bar', ctx8)).toBe(true);
    const rule7 = Rule.for('/:foo');
    const ctx9 = { foo: 'qux' };
    expect(rule7.matches('/bar', ctx9)).toBe(false);
    const rule8 = Rule.for('/:foo');
    const ctx10 = { foo: 'bar' };
    expect(rule8.matches('/bar', ctx10)).toBe(true);
    const rule9 = Rule.for('/:foo');
    const ctx11 = { foo: 'qux' };
    expect(rule9.matches('/bar', ctx11)).toBe(false);
    const rule10 = Rule.for('/:foo');
    const ctx12 = { foo: 'bar' };
    expect(rule10.matches('/bar', ctx12)).toBe(true);
    const rule11 = Rule.for('/:foo');
    const ctx13 = { foo: 'qux' };
    expect(rule11.matches('/bar', ctx13)).toBe(false);
    const rule12 = Rule.for('/:foo');
    const ctx14 = { foo: 'bar' };
    expect(rule12.matches('/bar', ctx14)).toBe(true);
    const rule13 = Rule.for('/:foo');
    const ctx15 = { foo: 'qux' };
    expect(rule13.matches('/bar', ctx15)).toBe(false);
    const rule14 = Rule.for('/:foo');
    const ctx16 = { foo: 'bar' };
    expect(rule14.matches('/bar', ctx16)).toBe(true);
    const rule15 = Rule.for('/:foo');
    const ctx17 = { foo: 'qux' };
    expect(rule15.matches('/bar', ctx17)).toBe(false);
    const rule16 = Rule.for('/:foo');
    const ctx18 = { foo: 'bar' };
    expect(rule16.matches('/bar', ctx18)).toBe(true);
    const rule17 = Rule.for('/:foo');
    const ctx19 = { foo: 'qux' };
    expect(rule17.matches('/bar', ctx19)).toBe(false);
  });
});