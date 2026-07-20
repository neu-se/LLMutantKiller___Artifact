import { Q } from "./q.js";

describe('Q Promise', () => {
    it('should return an array of states for the respective values', () => {
        const promises = [Q.resolve(1), Q.resolve(2), Q.resolve(3)];
        return Q.allSettled(promises).then((states: any[]) => {
            expect(states).not.toBeNull();
            expect(states).not.toBeUndefined();
            expect(typeof states).toBe('object');
            expect(states.length).toBe(3);
            states.forEach((state: any) => {
                expect(state).not.toBeNull();
                expect(state).not.toBeUndefined();
            });
        });
    });
});