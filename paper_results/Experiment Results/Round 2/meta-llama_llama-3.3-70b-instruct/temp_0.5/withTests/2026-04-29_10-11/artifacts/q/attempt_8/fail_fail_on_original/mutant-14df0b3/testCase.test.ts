import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('Q["delete"] should be a function', () => {
        expect(typeof Q["delete"]).toBe('function');
        Q["delete"] = function(object, key) {
            return Q(object).dispatch("delete", [key]);
        };
        expect(Q["delete"]).toBe(Q["delete"]);
    });
});