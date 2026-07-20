import { Q } from "../../../q.js";

describe('Q', () => {
    it('Q["delete"] should delete a property', () => {
        var object = {a: 1};
        return Q(object)["delete"]("a")
        .then(function () {
            expect("a" in object).toBe(false);
        });
    });
});