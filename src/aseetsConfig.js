import consts from './consts';

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
import gunImg from './images/gun.png';
import gunOppositeImg from './images/gun-opposite.png';
import healthPerkImg from './images/health-perk.png';
import doubleBulletPerkImg from './images/double-bullet-perk.png';

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
  [consts.PERK_HEALTH]: healthPerkImg,
  [consts.PERK_DOUBLE_BULLET]: doubleBulletPerkImg,
};

export default {
  images: {
    ...enemies,
    ...perks,
    me: meImg,
    bullet: bulletImg,
    gun: gunImg,
    gunOpposite: gunOppositeImg,
  },
};