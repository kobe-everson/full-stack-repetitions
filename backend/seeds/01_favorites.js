exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("favorites").del();
  await knex("table_name").insert([
    {
      title: "Inception",
      main_character: `Dominick "Dom" Cobb`,
      year_released: 2010,
    },
    {
      title: "Once Upon a Time In Hollywood",
      main_character: `Rick Dalton`,
      year_released: 2019,
    },
    {
      title: "Dunkirk",
      main_character: `Farrier`,
      year_released: 2017,
    },
  ]);
};
