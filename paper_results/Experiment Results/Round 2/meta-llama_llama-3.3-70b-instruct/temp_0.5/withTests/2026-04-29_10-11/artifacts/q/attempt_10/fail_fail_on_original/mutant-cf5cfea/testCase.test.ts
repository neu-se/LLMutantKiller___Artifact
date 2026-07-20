import { Q } from "../../../../../q.js";

describe('coerce function', () => {
    it('should reject the promise if an error occurs in the thenable', () => {
        var thenable = {
            then: function (fulfilled: any, rejected: any) {
                try {
                    throw new Error('test');
                } catch (e) {
                    rejected(e);
                }
            }
        };

        return Q(thenable).then((value: any) => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error.message).toBe('test');
        });
    });
});