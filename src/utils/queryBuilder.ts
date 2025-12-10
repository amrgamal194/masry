import { Query, Document } from 'mongoose';
import { QueryParams } from '../types/index.js';

/**
 * Advanced Query Builder for MongoDB
 */
class QueryBuilder<T extends Document> {
  private query: Query<T[], T>;
  private queryString: QueryParams;

  constructor(query: Query<T[], T>, queryString: QueryParams) {
    this.query = query;
    this.queryString = queryString;
  }

  /**
   * Filter documents
   */
  filter(): this {
    const queryObj: Record<string, any> = { ...this.queryString };
    const excludedFields = ['page', 'limit', 'sort', 'fields', 'search'];
    
    excludedFields.forEach((field) => delete queryObj[field]);

    // Advanced filtering with operators
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in|nin|ne)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  /**
   * Search in multiple fields
   */
  search(fields: string[] = []): this {
    if (this.queryString.search && fields.length > 0) {
      const searchRegex = new RegExp(this.queryString.search, 'i');
      const searchConditions = fields.map((field) => ({
        [field]: searchRegex,
      }));

      this.query = this.query.find({
        $or: searchConditions,
      });
    }
    return this;
  }

  /**
   * Sort documents
   */
  sort(defaultSort: string = '-createdAt'): this {
    const sortBy = this.queryString.sort || defaultSort;
    this.query = this.query.sort(sortBy);
    return this;
  }

  /**
   * Limit fields
   */
  limitFields(): this {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  /**
   * Paginate results
   */
  paginate(): this {
    const page = parseInt(this.queryString.page || '1', 10) || 1;
    const limit = parseInt(this.queryString.limit || '10', 10) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  /**
   * Get the query
   */
  getQuery(): Query<T[], T> {
    return this.query;
  }
}

export default QueryBuilder;

