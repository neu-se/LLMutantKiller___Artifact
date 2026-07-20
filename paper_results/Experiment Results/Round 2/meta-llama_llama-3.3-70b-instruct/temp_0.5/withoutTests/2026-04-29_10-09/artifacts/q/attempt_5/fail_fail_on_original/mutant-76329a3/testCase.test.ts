import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.fbind', () => {
    it('should return a function that calls the original function with the correct this context', () => {
        const obj = {
            foo: 'bar',
            method: function() {
                return this.foo;
            }
        };

        const boundMethod = Q.fbind(obj.method, obj);
        expect(boundMethod()).toBe('bar');
    });
});