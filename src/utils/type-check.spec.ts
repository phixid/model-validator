import { DataType, typeCheck } from './type-check';

describe('typeCheck', () => {
  test('handles booleans', () => {
    expect(typeCheck(false, DataType.Boolean)).toEqual(true);
    expect(typeCheck(true, DataType.Boolean)).toEqual(true);
    expect(typeCheck(0, DataType.Boolean)).toEqual(false);
    expect(typeCheck(1, DataType.Boolean)).toEqual(false);
    expect(typeCheck('test', DataType.Boolean)).toEqual(false);
    expect(typeCheck([], DataType.Boolean)).toEqual(false);
    expect(typeCheck({}, DataType.Boolean)).toEqual(false);
    expect(typeCheck(null, DataType.Boolean)).toEqual(false);
    expect(typeCheck(undefined, DataType.Boolean)).toEqual(false);
  });

  test('handles array of booleans', () => {
    expect(typeCheck([false, true], DataType.BooleanList)).toEqual(true);
    expect(typeCheck([false, true, 0], DataType.BooleanList)).toEqual(false);
    expect(typeCheck([false, true, 1], DataType.BooleanList)).toEqual(false);
    expect(typeCheck([false, true, ''], DataType.BooleanList)).toEqual(false);
    expect(typeCheck([false, true, 'test'], DataType.BooleanList)).toEqual(false);
    expect(typeCheck([false, true, []], DataType.BooleanList)).toEqual(false);
    expect(typeCheck([false, true, {}], DataType.BooleanList)).toEqual(false);
    expect(typeCheck([false, true, null], DataType.BooleanList)).toEqual(false);
    expect(typeCheck([false, true, undefined], DataType.BooleanList)).toEqual(false);

    expect(typeCheck('', DataType.BooleanList)).toEqual(false);
    expect(typeCheck('test', DataType.BooleanList)).toEqual(false);
    expect(typeCheck(0, DataType.BooleanList)).toEqual(false);
    expect(typeCheck(1, DataType.BooleanList)).toEqual(false);
    expect(typeCheck(false, DataType.BooleanList)).toEqual(false);
    expect(typeCheck(true, DataType.BooleanList)).toEqual(false);
    expect(typeCheck([], DataType.BooleanList)).toEqual(false);
    expect(typeCheck({}, DataType.BooleanList)).toEqual(false);
    expect(typeCheck(null, DataType.BooleanList)).toEqual(false);
    expect(typeCheck(undefined, DataType.BooleanList)).toEqual(false);
  });

  test('handles numbers', () => {
    expect(typeCheck(0, DataType.Number)).toEqual(true);
    expect(typeCheck(1, DataType.Number)).toEqual(true);
    expect(typeCheck(false, DataType.Number)).toEqual(false);
    expect(typeCheck(true, DataType.Number)).toEqual(false);
    expect(typeCheck('test', DataType.Number)).toEqual(false);
    expect(typeCheck([], DataType.Number)).toEqual(false);
    expect(typeCheck({}, DataType.Number)).toEqual(false);
    expect(typeCheck(null, DataType.Number)).toEqual(false);
    expect(typeCheck(undefined, DataType.Number)).toEqual(false);
  });

  test('handles array of numbers', () => {
    expect(typeCheck([0, 1], DataType.NumberList)).toEqual(true);
    expect(typeCheck([0, 1, false], DataType.NumberList)).toEqual(false);
    expect(typeCheck([0, 1, true], DataType.NumberList)).toEqual(false);
    expect(typeCheck([0, 1, ''], DataType.NumberList)).toEqual(false);
    expect(typeCheck([0, 1, 'test'], DataType.NumberList)).toEqual(false);
    expect(typeCheck([0, 1, []], DataType.NumberList)).toEqual(false);
    expect(typeCheck([0, 1, {}], DataType.NumberList)).toEqual(false);
    expect(typeCheck([0, 1, null], DataType.NumberList)).toEqual(false);
    expect(typeCheck([0, 1, undefined], DataType.NumberList)).toEqual(false);

    expect(typeCheck('', DataType.NumberList)).toEqual(false);
    expect(typeCheck('test', DataType.NumberList)).toEqual(false);
    expect(typeCheck(0, DataType.NumberList)).toEqual(false);
    expect(typeCheck(1, DataType.NumberList)).toEqual(false);
    expect(typeCheck(false, DataType.NumberList)).toEqual(false);
    expect(typeCheck(true, DataType.NumberList)).toEqual(false);
    expect(typeCheck([], DataType.NumberList)).toEqual(false);
    expect(typeCheck({}, DataType.NumberList)).toEqual(false);
    expect(typeCheck(null, DataType.NumberList)).toEqual(false);
    expect(typeCheck(undefined, DataType.NumberList)).toEqual(false);
  });

  test('handles strings', () => {
    expect(typeCheck('', DataType.String)).toEqual(true);
    expect(typeCheck('test', DataType.String)).toEqual(true);
    expect(typeCheck(0, DataType.String)).toEqual(false);
    expect(typeCheck(1, DataType.String)).toEqual(false);
    expect(typeCheck(false, DataType.String)).toEqual(false);
    expect(typeCheck(true, DataType.String)).toEqual(false);
    expect(typeCheck([], DataType.String)).toEqual(false);
    expect(typeCheck({}, DataType.String)).toEqual(false);
    expect(typeCheck(null, DataType.String)).toEqual(false);
    expect(typeCheck(undefined, DataType.String)).toEqual(false);
  });

  test('handles array of string', () => {
    expect(typeCheck(['', 'test'], DataType.StringList)).toEqual(true);
    expect(typeCheck(['', 'test', false], DataType.StringList)).toEqual(false);
    expect(typeCheck(['', 'test', true], DataType.StringList)).toEqual(false);
    expect(typeCheck(['', 'test', 0], DataType.StringList)).toEqual(false);
    expect(typeCheck(['', 'test', 1], DataType.StringList)).toEqual(false);
    expect(typeCheck(['', 'test', []], DataType.StringList)).toEqual(false);
    expect(typeCheck(['', 'test', {}], DataType.StringList)).toEqual(false);
    expect(typeCheck(['', 'test', null], DataType.StringList)).toEqual(false);
    expect(typeCheck(['', 'test', undefined], DataType.StringList)).toEqual(false);

    expect(typeCheck('', DataType.StringList)).toEqual(false);
    expect(typeCheck('test', DataType.StringList)).toEqual(false);
    expect(typeCheck(0, DataType.StringList)).toEqual(false);
    expect(typeCheck(1, DataType.StringList)).toEqual(false);
    expect(typeCheck(false, DataType.StringList)).toEqual(false);
    expect(typeCheck(true, DataType.StringList)).toEqual(false);
    expect(typeCheck([], DataType.StringList)).toEqual(false);
    expect(typeCheck({}, DataType.StringList)).toEqual(false);
    expect(typeCheck(null, DataType.StringList)).toEqual(false);
    expect(typeCheck(undefined, DataType.StringList)).toEqual(false);
  });

  test('handles array of multiple types (strings, numbers and booleans)', () => {
    expect(typeCheck(['', 'test', 0, 1, false, true, [], {}, null, undefined], DataType.GenericList)).toEqual(true);

    expect(typeCheck('', DataType.GenericList)).toEqual(false);
    expect(typeCheck('test', DataType.GenericList)).toEqual(false);
    expect(typeCheck(0, DataType.GenericList)).toEqual(false);
    expect(typeCheck(1, DataType.GenericList)).toEqual(false);
    expect(typeCheck(false, DataType.GenericList)).toEqual(false);
    expect(typeCheck(true, DataType.GenericList)).toEqual(false);
    expect(typeCheck([], DataType.GenericList)).toEqual(true);
    expect(typeCheck({}, DataType.GenericList)).toEqual(false);
    expect(typeCheck(null, DataType.GenericList)).toEqual(false);
    expect(typeCheck(undefined, DataType.GenericList)).toEqual(false);
  });

  test('handles objects', () => {
    expect(typeCheck({}, DataType.Object)).toEqual(true);
    expect(typeCheck('', DataType.Object)).toEqual(false);
    expect(typeCheck('test', DataType.Object)).toEqual(false);
    expect(typeCheck(0, DataType.Object)).toEqual(false);
    expect(typeCheck(1, DataType.Object)).toEqual(false);
    expect(typeCheck(false, DataType.Object)).toEqual(false);
    expect(typeCheck(true, DataType.Object)).toEqual(false);
    expect(typeCheck([], DataType.Object)).toEqual(false);
    expect(typeCheck(null, DataType.Object)).toEqual(false);
    expect(typeCheck(undefined, DataType.Object)).toEqual(false);
  });

  test('handles incorrect type', () => {
    // @ts-ignore
    expect(typeCheck(0, 'incorrectType')).toEqual(false);
  });
});