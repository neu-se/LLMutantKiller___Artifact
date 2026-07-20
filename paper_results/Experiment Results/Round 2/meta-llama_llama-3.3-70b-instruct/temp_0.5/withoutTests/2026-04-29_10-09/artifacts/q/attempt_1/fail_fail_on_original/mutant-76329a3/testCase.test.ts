import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.fbind', () => {
    it('should bind the function correctly', () => {
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