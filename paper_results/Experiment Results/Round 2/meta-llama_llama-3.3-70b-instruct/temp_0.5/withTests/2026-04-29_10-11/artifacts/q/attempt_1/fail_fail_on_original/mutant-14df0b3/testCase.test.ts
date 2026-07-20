import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('Q["delete"] should delete a property', () => {
        var object = {a: 1};
        return Q(object).del("a")
        .then(function () {
            expect("a" in object).toBe(false);
        });
    });
});