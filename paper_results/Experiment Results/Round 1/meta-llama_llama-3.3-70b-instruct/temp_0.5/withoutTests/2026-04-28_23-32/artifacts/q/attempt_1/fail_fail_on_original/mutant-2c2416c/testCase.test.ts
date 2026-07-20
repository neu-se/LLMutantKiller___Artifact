import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error with a stack trace when using deprecate', () => {
        const callback = jest.fn();
        const name = 'test';
        const alternative = 'alternative';
        const deprecatedFunction = Q.deprecate(callback, name, alternative);
        expect(() => deprecatedFunction()).toThrowError();
        const error = new Error();
        const stack = error.stack;
        expect(stack).toContain(name);
        expect(stack).toContain(alternative);
        expect(stack).toContain('instead');
    });
});