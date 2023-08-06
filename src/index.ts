import axios from 'axios';
import { timeCompare } from './utils/timeSort';

export enum Plantform {
  PC = 'pc',
  XBOX = 'xbl',
  PS = 'psn',
  SWITCH = 'nintendo-switch',
}

export enum Region {
  US = 'us',
  EU = 'eu',
  ASIA = 'asia',
  GLOBAL = 'global',
}

export class OwApi {
  tagConvert = (tag: string) => tag.replace('#', '-');
  getProfile = async (
    tag: string,
    platform: Plantform = Plantform.PC,
    region: Region = Region.GLOBAL,
  ) => {
    tag = this.tagConvert(tag);
    const url = `https://ow-api.com/v1/stats/${platform}/${region}/${tag}/profile`;
    const { data } = await axios.get(url);
    return data;
  };

  getComplete = async (
    tag: string,
    platform: Plantform = Plantform.PC,
    region: Region = Region.GLOBAL,
  ) => {
    tag = this.tagConvert(tag);
    const url = `https://ow-api.com/v1/stats/${platform}/${region}/${tag}/complete`;
    const { data } = await axios.get(url);
    return data;
  };

  getHeroes = async (
    tag: string,
    heroes: string[],
    platform: Plantform = Plantform.PC,
    region: Region = Region.GLOBAL,
  ) => {
    tag = this.tagConvert(tag);
    const url = `https://ow-api.com/v1/stats/${platform}/${region}/${tag}/heroes/${heroes.join(
      ',',
    )}`;
    const { data } = await axios.get(url);
    return data;
  };
}

export interface Ratings {
  group: string;
  tier: number;
  role: string;
}

export interface BasicInfo {
  name: string;
  gamesWon: number;
  gamesPlayed: number;
  ratings: Ratings[];
}

export enum GameMode {
  QUICKPLAY = 'quickPlayStats',
  COMPETITIVE = 'competitiveStats',
}

export class OW {
  private owApi: OwApi;
  constructor() {
    this.owApi = new OwApi();
  }

  getBasicInfo = async (tag: string, platform?: Plantform, region?: Region): Promise<BasicInfo> => {
    const data = await this.owApi.getProfile(tag, platform, region);
    if (data.private) {
      throw new Error('Private profile');
    }
    return {
      name: data.name,
      gamesWon: data.gamesWon,
      gamesPlayed: data.gamesPlayed,
      ratings: data.ratings,
    };
  };

  getTopHeroes = async (
    tag: string,
    num: number,
    mode: GameMode = GameMode.COMPETITIVE,
    platform?: Plantform,
    region?: Region,
  ) => {
    const data = await this.owApi.getComplete(tag, platform, region);
    if (data.private) {
      throw new Error('Private profile');
    }
    const heroes = data[mode as string].topHeroes;
    const heroesArr: any[] = [];
    Object.keys(heroes).forEach((hero) => {
      // if (heroes[hero].timePlayed) {
      heroesArr.push({
        name: hero,
        ...heroes[hero],
      });
      // }
    });
    // sort by time played
    heroesArr.sort((a, b) => (timeCompare(a.timePlayed, b.timePlayed) ? 1 : -1));
    return heroesArr.slice(0, num);
  };
}
