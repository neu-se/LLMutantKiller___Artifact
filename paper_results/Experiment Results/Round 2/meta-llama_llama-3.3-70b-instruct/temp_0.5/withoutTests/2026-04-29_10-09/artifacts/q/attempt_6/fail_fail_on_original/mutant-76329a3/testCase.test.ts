import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.fbind', () => {
    it('should return a function that calls the original function and returns the correct value', () => {
        const obj = {
            foo: 'bar',
            method: function() {
                return this.foo;
            }
        };

        const boundMethod = Q.fbind(obj.method, obj);
        const result = boundMethod();
        expect(typeof result).toBe('string');
        expect(result).toEqual('bar');
    });
});