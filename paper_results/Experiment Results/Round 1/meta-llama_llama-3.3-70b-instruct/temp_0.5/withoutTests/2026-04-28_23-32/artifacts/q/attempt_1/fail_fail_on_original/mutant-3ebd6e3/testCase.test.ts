import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q Promise', () => {
    it('should return an array of states for the respective values', () => {
        const promises = [Q.resolve(1), Q.resolve(2), Q.resolve(3)];
        return Q.allSettled(promises).then((states) => {
            expect(states).toEqual([
                { state: 'fulfilled', value: 1 },
                { state: 'fulfilled', value: 2 },
                { state: 'fulfilled', value: 3 },
            ]);
        });
    });
});