import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.fbind', () => {
    it('should return a function that calls the original function with the correct arguments', () => {
        const obj = {
            foo: 'bar',
            method: function(arg1: string, arg2: string) {
                return this.foo + arg1 + arg2;
            }
        };

        const boundMethod = Q.fbind(obj.method, obj);
        expect(boundMethod('arg1', 'arg2')).toBe('bararg1arg2');
    });
});