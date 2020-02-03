exports.up = function(knex) {
  console.log("creating topics --");
  return knex.schema.createTable(topics, topicsTable => {
    topicsTable.string("slug").primary(); // slug is a string?
    topicsTable.string("description").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("topics");
};
