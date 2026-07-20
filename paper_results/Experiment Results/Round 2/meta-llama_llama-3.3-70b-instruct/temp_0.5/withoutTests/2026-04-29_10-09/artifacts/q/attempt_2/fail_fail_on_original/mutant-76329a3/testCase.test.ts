import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.fbind', () => {
    it('should bind the function correctly and return a new function', () => {
        const obj = {
            foo: 'bar',
            method: function() {
                return this.foo;
            }
        };

        const boundMethod = Q.fbind(obj.method, obj);
        expect(typeof boundMethod).toBe('function');
    });
});