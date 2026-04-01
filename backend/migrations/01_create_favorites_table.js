exports.up = function (knex) {
  return knex.schema.createTable("favorites", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("main_character");
    table.integer("year_released").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("favorites");
};
