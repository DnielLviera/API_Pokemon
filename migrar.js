const mongoose = require('mongoose');
const Pokemon = require('./models/pokemon.model');
const datosPokemon = require('./backend/pokemon.json');
require('dotenv').config();

async function migrateData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Limpiar la colección primero
    await Pokemon.deleteMany({});

    // Filtrar pokémones válidos (eliminar los que tienen id null o name vacío)
    const pokemonesValidos = datosPokemon.pokemon.filter(poke => 
      poke.id !== null && poke.name && poke.name.trim() !== ''
    );

    // Insertar los datos
    await Pokemon.insertMany(pokemonesValidos);
    
    console.log('Datos migrados exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('Error durante la migración:', error);
    process.exit(1);
  }
}

migrateData();