import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly handle the "post" method', () => {
        const object = {
            foo: function(arg1, arg2) {
                return arg1 + arg2;
            }
        };

        const promise = Q(object);
        promise.post('foo', [1, 2]).then((result) => {
            expect(result).toBe(3);
        });
    });
});