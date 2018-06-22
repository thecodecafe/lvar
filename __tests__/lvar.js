import lvar from '../lib/index';

test('Initialize lvar', () => {
    var person = new lvar('Daniel');
    console.log(person);
    expect(person).toBe(person);
});