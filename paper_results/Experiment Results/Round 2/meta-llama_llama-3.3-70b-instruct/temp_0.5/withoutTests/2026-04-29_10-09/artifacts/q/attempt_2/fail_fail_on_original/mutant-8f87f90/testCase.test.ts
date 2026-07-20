import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly handle the "post" method', () => {
        const object = {
            foo: function(arg1: any, arg2: any) {
                return arg1 + arg2;
            }
        };

        const promise = q.Q(object);
        return promise.post('foo', [1, 2]).then((result: any) => {
            expect(result).toBe(3);
        });
    });
});