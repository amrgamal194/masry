/**
 * General helper utilities
 */

/**
 * Sanitize object - remove sensitive fields
 */
export const sanitizeObject = <T extends Record<string, any>>(
  obj: T,
  fieldsToRemove: string[] = []
): Partial<T> => {
  const defaultFields = ['password', 'refreshToken', '__v'];
  const allFieldsToRemove = [...defaultFields, ...fieldsToRemove];
  
  const sanitized = { ...obj };
  allFieldsToRemove.forEach((field) => {
    delete sanitized[field];
  });
  
  return sanitized;
};

/**
 * Generate random string
 */
export const generateRandomString = (length: number = 32): string => {
  const crypto = require('crypto');
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Sleep/delay function
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Check if value is empty
 */
export const isEmpty = (value: any): boolean => {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim().length === 0) ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
};

/**
 * Deep clone object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Format date
 */
export const formatDate = (date: Date | string | number, format: string = 'ISO'): string | number => {
  const d = new Date(date);
  if (format === 'ISO') return d.toISOString();
  if (format === 'timestamp') return d.getTime();
  if (format === 'date') return d.toDateString();
  return d.toString();
};

