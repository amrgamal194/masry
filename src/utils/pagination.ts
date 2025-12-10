import { PAGINATION } from '../constants/index.js';
import { QueryParams, PaginationMeta } from '../types/index.js';

export interface PaginationResult {
  page: number;
  limit: number;
  skip: number;
}

export interface SortResult {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  sortString: string;
}

/**
 * Parse pagination parameters from query
 */
export const parsePagination = (query: QueryParams): PaginationResult => {
  const page = Math.max(1, parseInt(query.page || '1', 10) || PAGINATION.DEFAULT_PAGE);
  const limit = Math.min(
    PAGINATION.MAX_LIMIT,
    Math.max(1, parseInt(query.limit || '10', 10) || PAGINATION.DEFAULT_LIMIT)
  );
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

/**
 * Parse sort parameters from query
 */
export const parseSort = (query: QueryParams, defaultSort: string = '-createdAt'): SortResult => {
  const sortBy = query.sort || defaultSort;
  const sortOrder = (query.sortOrder || (sortBy.startsWith('-') ? 'desc' : 'asc')) as 'asc' | 'desc';
  
  return {
    sortBy: sortBy.replace(/^-/, ''),
    sortOrder,
    sortString: sortBy,
  };
};

/**
 * Parse filter parameters
 */
export const parseFilters = (query: QueryParams, allowedFilters: string[] = []): Record<string, any> => {
  const filters: Record<string, any> = {};
  
  allowedFilters.forEach((filter) => {
    if (query[filter] !== undefined) {
      filters[filter] = query[filter];
    }
  });

  return filters;
};

/**
 * Build pagination metadata
 */
export const buildPaginationMeta = (page: number, limit: number, total: number): PaginationMeta => {
  return {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
    hasNext: page < Math.ceil(total / limit),
    hasPrev: page > 1,
  };
};

