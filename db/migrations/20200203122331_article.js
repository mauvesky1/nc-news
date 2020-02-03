exports.up = function(knex) {
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title");
    articlesTable.string("body");
    articlesTable.increments("votes");
    articlesTable
      .string("field")
      .references("slug")
      .inTable("topics");
    articlesTable
      .string("author")
      .references("username")
      .inTable("users");
    articlesTable.timestamp("created_at");
    //.references('id').inTable('
  });
};

exports.down = function(knex) {};
