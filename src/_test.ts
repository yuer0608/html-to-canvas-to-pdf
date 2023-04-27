import { Greeter } from './test';

test('My Greeter', () => {
    expect(Greeter('Carl')).toBe('Hello Carl');
});
