class QueryFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword.trim().length > 0
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const clone = { ...this.queryStr };
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => delete clone[el]);
    let queryStr = JSON.stringify(clone);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(perPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = perPage * (currentPage - 1);
    this.query = this.query.limit(perPage).skip(skip);
    return this;
  }
}

module.exports = QueryFeatures;
