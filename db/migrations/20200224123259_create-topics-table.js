exports.up = function(knex) {
  return knex.schema.createTable("topics", topicsTable => {
    topicsTable.string("slug").primary();
    topicsTable.string("description").notNullable();
  });
};
//
//20200203114930_topic
//20200203124215_comments
//20200203122331_article
//20200203121649_user

exports.down = function(knex) {
  return knex.schema.dropTable("topics");
};
