import { OwApi, Plantform, Region, OW, GameMode } from '.';

const owApi = new OwApi();

// owApi.getProfile('WitchElaina-2678', Plantform.PC, Region.GLOBAL).then(console.log);
// owApi.getComplete('WitchElaina-2678', Plantform.PC, Region.GLOBAL).then(console.log);
// owApi
//   .getHeroes('WitchElaina-2678', ['ana', 'genji'], Plantform.PC, Region.GLOBAL)
//   .then(console.log);

const ow = new OW();

ow.getBasicInfo('WitchElaina-2678', Plantform.PC, Region.GLOBAL).then(console.log);
ow.getTopHeroes('WitchElaina-2678', 5, GameMode.COMPETITIVE, Plantform.PC, Region.GLOBAL).then(
  (res) => {
    res.forEach((hero) => {
      console.log(hero.name, hero.timePlayed);
    });
  },
);
ow.getTopHeroes('WitchElaina-2678', 5).then((res) => {
  res.forEach((hero) => {
    console.log(hero.name, hero.timePlayed);
  });
});
