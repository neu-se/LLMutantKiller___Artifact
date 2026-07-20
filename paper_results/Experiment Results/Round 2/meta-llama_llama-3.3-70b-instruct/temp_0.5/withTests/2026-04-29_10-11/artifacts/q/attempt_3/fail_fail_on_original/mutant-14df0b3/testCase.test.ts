import { Q } from "../../../../../q";

describe('Q', () => {
    it('Q["delete"] should delete a property', () => {
        var object = {a: 1};
        var promise = Q(object)["delete"]("a");
        return promise.then(function () {
            expect("a" in object).toBe(false);
        });
    });
});