import { DataType, typeCheck } from './lib/type-check';

type Model = {
  [key: string]: {
    required?: boolean;
    type: DataType;
    model?: Model;
  };
};

export const validateWithModel = async (obj: any, model: Model) => {
  if (!obj || typeof obj !== 'object') {
    const error =
      typeof obj === 'boolean' || typeof obj === 'number' || typeof obj === 'string'
        ? `Model validation error: obj is of type ${typeof obj}`
        : `Model validation error: obj is ${obj}`;

    return {
      errors: [error],
      isValid: false,
    };
  }

  const { errors: requiredPropertyErrors, hasRequiredProperties } = checkForRequiredProperties(model, obj);
  const { errors: matchingPropertyTypeErrors, hasMatchingPropertyTypes } = checkForMatchingPropertyTypes(model, obj);
  const aggregateErrors = [...requiredPropertyErrors, ...matchingPropertyTypeErrors];

  return {
    errors: aggregateErrors.length ? aggregateErrors : null,
    isValid: hasRequiredProperties && hasMatchingPropertyTypes,
  };
};

/**
 * Check if an object has the required properties of a model
 * @param model
 * @param obj
 */
type RequiredPropertiesReturnType = { errors: string[]; hasRequiredProperties: boolean };
const checkForRequiredProperties = (model: Model, obj: any): RequiredPropertiesReturnType => {
  // @ts-ignore
  return Object.entries(model)
    .filter(([_, value]) => value && value.required)
    .reduce(
      (acc: RequiredPropertiesReturnType, [requiredKey, requiredValue]) => {
        const errors: string[] = [...acc.errors];
        const isDefined = obj[requiredKey] !== undefined;
        if (!isDefined) errors.push(`Model validation error: missing required property ${requiredKey}`);

        const isNestedObject = requiredValue.type === DataType.Object && typeCheck(obj[requiredKey], DataType.Object);
        if (isNestedObject && requiredValue.model) {
          const {
            errors: nestedErrors,
            hasRequiredProperties: hasNestedRequiredProperties,
          } = checkForRequiredProperties(requiredValue.model, obj[requiredKey]);

          return {
            errors: [...errors, ...nestedErrors],
            hasRequiredProperties: acc.hasRequiredProperties && isDefined && hasNestedRequiredProperties,
          };
        }

        return {
          errors,
          hasRequiredProperties: acc.hasRequiredProperties && isDefined,
        };
      },
      {
        errors: [],
        hasRequiredProperties: true,
      }
    );
};

/**
 * Check if an objects properties match the types of a model
 * @param model
 * @param obj
 */
type MatchingPropertyTypesReturnType = { errors: string[]; hasMatchingPropertyTypes: boolean };
const checkForMatchingPropertyTypes = (model: Model, obj: any): MatchingPropertyTypesReturnType => {
  return Object.entries(model).reduce(
    (acc: MatchingPropertyTypesReturnType, [key, value]) => {
      const errors: string[] = [...acc.errors];
      const canBeUndefined = !value.required && obj[key] === undefined;
      const isMatchingPropertyType = typeCheck(obj[key], value.type);

      if (!canBeUndefined && !isMatchingPropertyType) {
        errors.push(`Model validation error: property ${key} has type ${typeof obj[key]} expected type ${value.type}`);
      }

      const isNestedObject = value.type === DataType.Object && typeCheck(obj[key], DataType.Object);
      if (isNestedObject && value.model) {
        const {
          errors: nestedErrors,
          hasMatchingPropertyTypes: hasNestedNestedMatchingPropertyTypes,
        } = checkForMatchingPropertyTypes(value.model, obj[key]);

        return {
          errors: [...errors, ...nestedErrors],
          hasMatchingPropertyTypes:
            acc.hasMatchingPropertyTypes &&
            (canBeUndefined || isMatchingPropertyType) &&
            hasNestedNestedMatchingPropertyTypes,
        };
      }

      return {
        errors,
        hasMatchingPropertyTypes: acc.hasMatchingPropertyTypes && (canBeUndefined || isMatchingPropertyType),
      };
    },
    {
      errors: [],
      hasMatchingPropertyTypes: true,
    }
  );
};
