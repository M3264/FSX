const express = require('express');
const router = express.Router();

router.delete('/cache-all', (req, res) => {
 

try {

(async () => {
  const client = redis.createClient();

  client.on('error', (err) => console.error('Redis Client Error', err));
  await client.connect();

  const pattern = 'SSR:*';

  const keys = await client.keys(pattern);
  console.log(`🧹 Clés à supprimer : ${keys.length}`);

  if (keys.length > 0) {
    await client.del(keys);
    console.log('✅ Clés supprimées avec succès.');
  } else {
    console.log('⚠️ Aucune clé trouvée avec le pattern SSR:*');
  }

  await client.disconnect();
})();


} catch(error){
    console.error("Cannnot delete cache")
}

});

module.exports = router;