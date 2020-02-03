exports.up = function(knex) {
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable
      .string("author")
      .references("username")
      .inTable("users");
    commentsTable
      .integer("article_id")
      .references("article_id")
      .inTable("articles");
    commentsTable.increments("votes");
    commentsTable.timestamp("created_at");
    commentsTable.string("body");
  });
};

exports.down = function(knex) {};
