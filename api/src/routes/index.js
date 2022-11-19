const { Router } = require("express");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Breed, Temperament } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiData = async () => {
  const apiURL = await axios.get("https://api.thedogapi.com/v1/breeds");
  const apiData = await apiURL.data.map((i) => ({
    id: i.id,
    name: i.name,
    height: i.height.metric,
    weight: i.weight.metric === "NaN" ? "20" : i.weight.metric,
    lifeSpan: i.life_span,
    image: i.image,
    temperament: i.temperament ? i.temperament : "Temperament not defined",
  }));
  return apiData;
};

const getDbData = async () => {
  //get data from local db
  const dbData = await Breed.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  //map as convenient

  const localDbMap = await dbData.map((el) => {
    return {
      id: el.id,
      name: el.name,
      weight: el.weight,
      height: el.height,
      lifeSpan: el.life_span,
      image: el.image,
      createdInDb: true,
      temperament: el.temperaments.map((e) => e.name).join(", "), // Personally I'd rather just navigate the array. Check again later.
    };
  });

  return localDbMap;
};

const fetchAllBreeds = async () => {
  // const allBreeds = await getApiData().concat(await getDbData());

  const apiData = await getApiData();
  const dbData = await getDbData();
  const allBreeds = apiData.concat(dbData);

  return allBreeds;
};

router.get("/dogs", async (req, res) => {
  try {
    const { name } = req.query;

    const allBreeds = await fetchAllBreeds();

    if (!name) {
      return res.status(200).json(allBreeds);
    }

    const filteredByName = allBreeds.filter((breedIndex) =>
      breedIndex.name.toLowerCase().includes(name.toLowerCase())
    );
    if (!filteredByName.length) throw new Error("Breed not found!");

    return res.status(200).json(filteredByName);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allBreeds = await fetchAllBreeds();
    const filteredById = allBreeds.filter((breedIndex) => breedIndex.id == id);
    return res.status(200).json(filteredById[0]);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/dogs", async (req, res) => {
  const { name, height, weight, life_span, image, temperament } = req.body;
  try {
    if (!name || !height || !weight || !temperament.length) {
      throw new Error("Missing values!");
    }
    const newBreed = await Breed.create({
      name,
      height,
      weight,
      life_span,
      image,
    });

    const matchingTemperament = await Temperament.findAll({
      where: { name: temperament },
    });

    newBreed.addTemperament(matchingTemperament);

    res.status(200).json("New breed was created!");
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/temperaments", async (req, res) => {
  try {
    const tempApi = await axios("https://api.thedogapi.com/v1/breeds");

    const temperamentDb = tempApi.data
      .map((breed) => breed.temperament)
      .toString()
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 1);

    const filteredTemperaments = [...new Set(temperamentDb)];

    filteredTemperaments.forEach((t) =>
      Temperament.findOrCreate({ where: { name: t } })
    );
    const allTemperaments = await Temperament.findAll();
    return res.status(200).json(allTemperaments);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
