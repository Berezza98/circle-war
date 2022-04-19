import {
  PERK_ARMOR, PERK_HEALTH, PERK_DOUBLE_BULLET, PERK_ICE,
  PERK_MISSILES,
} from './consts';

import angryImg from './images/angry.png';
import angryImg2 from './images/angry2.png';
import angryImg3 from './images/angry3.png';
import angryImg4 from './images/angry4.png';
import angryImg5 from './images/angry5.png';
import angryImg6 from './images/angry6.png';
import angryImg7 from './images/angry7.png';
import angryImg8 from './images/angry8.png';
import angryImg9 from './images/angry9.png';
import angryImg10 from './images/angry10.png';
import meImg from './images/me.png';
import bulletImg from './images/bullet.png';
import iceBulletImg from './images/ice-bullet.png';
import gunImg from './images/gun.png';
import gunOppositeImg from './images/gun-opposite.png';
import healthPerkImg from './images/health-perk.png';
import doubleBulletPerkImg from './images/double-bullet-perk.png';
import armorPerkImg from './images/armor-perk.png';
import icePerkImg from './images/ice-perk.png';
import missilesPerkImg from './images/missiles-perk.png';

export const enemies = {
  angry: angryImg,
  angry2: angryImg2,
  angry3: angryImg3,
  angry4: angryImg4,
  angry5: angryImg5,
  angry6: angryImg6,
  angry7: angryImg7,
  angry8: angryImg8,
  angry9: angryImg9,
  angry10: angryImg10,
};

export const perks = {
  [PERK_HEALTH]: healthPerkImg,
  [PERK_DOUBLE_BULLET]: doubleBulletPerkImg,
  [PERK_ARMOR]: armorPerkImg,
  [PERK_ICE]: icePerkImg,
  [PERK_MISSILES]: missilesPerkImg,
};

export default {
  images: {
    ...enemies,
    ...perks,
    me: meImg,
    bullet: bulletImg,
    iceBullet: iceBulletImg,
    gun: gunImg,
    gunOpposite: gunOppositeImg,
  },
};